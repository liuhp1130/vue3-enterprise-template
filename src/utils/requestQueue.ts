import { requestPool } from "@/utils/requestPool"

type Task = () => Promise<unknown>
interface addParams {
  task: Task
  pageKey: string
  requestUrl: string
}
class RequestQueue {
  private queue: Task[] = []
  private maxConcurrent: number
  private running: number = 0
  constructor(maxConcurrent: number = 1) {
    this.maxConcurrent = maxConcurrent
  }

  add(config: addParams): Promise<unknown> {
    const controller = new AbortController()
    const { task, pageKey, requestUrl } = config
    const requestMap = new Map<string, AbortController>()
    requestMap.set(requestUrl, controller)

    if (pageKey) {
      requestPool.add(pageKey, requestMap)
    }
    // 返回一个promise
    return new Promise((resolve, reject) => {
      const run = (pageKey: string) => {
        console.log(requestUrl, "pageKey run666 ")

        if (requestPool.isCanceled(pageKey)) {
          reject("请求被取消")
          return
        }
        this.running++
        return task()
          .then(resolve)
          .catch(reject)
          .finally(() => {
            this.running--
            console.log("finally==", pageKey, requestPool.get(pageKey))

            if (requestPool.get(pageKey)) {
              console.log("请求结束，从requestPool中移除", pageKey)

              requestPool.remove(pageKey, requestUrl)
            }
            this.next()
          })
      }
      // 判断当前正在运行数量是否小于最大并发数
      if (this.running < this.maxConcurrent) {
        run(pageKey)
      } else {
        this.queue.push(async () => run(pageKey))
      }
    })
  }
  next() {
    if (this.running >= this.maxConcurrent) return
    if (this.queue.length == 0) return
    const task = this.queue.shift()
    console.log(task, "next")

    if (task) task()
  }
}

export const requestQueue = new RequestQueue()
