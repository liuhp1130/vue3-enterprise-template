import { requestPool } from "@/utils/requestPool"

type Task = () => Promise<unknown>
interface addParams {
  task: Task
  pageKey: string
  requestUrl: string
  priority: number
}
class RequestQueue {
  private queue: Task[] = []
  private maxConcurrent: number
  private running: number = 0
  private sortQueueList: addParams[] = []
  private queueTmp: addParams[] = []
  constructor(maxConcurrent: number = 1) {
    this.maxConcurrent = maxConcurrent
  }
  sortQueue(config: addParams) {
    this.sortQueueList.push(config)
    this.sortQueueList.sort((a, b) => b.priority - a.priority)
  }

  createTaskQueue() {
    this.sortQueueList.forEach((config) => {
      if (!this.queueTmp.includes(config)) {
        this.queue.push(async () => this.run(config))
        this.queueTmp.push(config)
      }
    })
  }

  add(config: addParams): Promise<unknown> {
    // 返回一个promise
    return new Promise((resolve, reject) => {
      const { pageKey, requestUrl } = config
      const controller = new AbortController()
      if (pageKey) {
        const requestMap = new Map<string, AbortController>()
        requestMap.set(requestUrl, controller)
        requestPool.add(pageKey, requestMap)
      }
      // 排序
      this.sortQueue(config)
      // 异步，确保并发请求已排好序
      setTimeout(() => {
        this.createTaskQueue()
        // 判断当前正在运行数量是否小于最大并发数
        if (this.running < this.maxConcurrent) {
          const task = this.queue.shift()
          task?.().then(resolve).catch(reject)
        }
      }, 0)
    })
  }
  async run(config: addParams) {
    const { task, pageKey, requestUrl } = config

    if (requestPool.isCanceled(pageKey)) {
      return Promise.reject(`${requestUrl}请求被取消`)
    }
    this.running++
    try {
      const res = await task()
      this.queueTmp = this.queueTmp.filter(
        (item) => item.requestUrl !== config.requestUrl
      )
      this.sortQueueList = this.sortQueueList.filter(
        (item) => item.requestUrl !== config.requestUrl
      )
      return res
    } catch (error) {
      return Promise.reject(error)
    } finally {
      this.running--

      if (requestPool.get(pageKey)) {
        console.log("请求结束，从requestPool中移除", requestUrl)

        requestPool.remove(pageKey, requestUrl)
      }
      this.next()
    }
  }
  next() {
    if (this.running >= this.maxConcurrent) return
    if (this.queue.length == 0) return
    const task = this.queue.shift()
    if (task) task()
  }
}

export const requestQueue = new RequestQueue()
