type RequestMap = Map<string, AbortController>
class RequestPool {
  private abortRequest = new Set<string>()
  private pool = new Map<string, Set<RequestMap>>()
  add(pageKey: string, requestMap: RequestMap) {
    // 不存在pageKey，创建一个新的set
    if (!this.pool.has(pageKey)) {
      this.pool.set(pageKey, new Set([requestMap]))
    }
    // 存在pageKey，添加到map中
    this.pool.get(pageKey)?.add(requestMap)
  }

  remove(pageKey: string, request: string) {
    console.log(this.pool, "this.pool remove")

    if (!this.pool.has(pageKey)) return
    // 存在pageKey，删除map中对应的controller
    this.pool.get(pageKey)?.forEach((map) => {
      if (map.has(request)) {
        map.delete(request)
      }
    })
  }

  clear(pageKey: string) {
    this.abortRequest.add(pageKey)
    console.log(this.pool.has(pageKey), "pageKey===")

    const requestSet = this.pool.get(pageKey)
    if (!requestSet?.size) return console.log("requestSet为空", pageKey)
    this.pool.delete(pageKey)
    requestSet.forEach((map) => {
      map.forEach((controller) => {
        console.log("abort")
        controller.abort()
      })
    })

    console.log("clear", pageKey, this.pool)
  }
  get(pageKey: string) {
    return this.pool.get(pageKey)
  }
  isCanceled(pageKey: string) {
    return this.abortRequest.has(pageKey)
  }
}

export const requestPool = new RequestPool()
