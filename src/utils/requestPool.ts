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
  // 在请求池中删除已执行完成的请求
  remove(pageKey: string, requestUrl: string) {
    if (!this.pool.has(pageKey)) return
    // 存在pageKey，删除map中对应的controller
    this.pool.get(pageKey)?.forEach((map) => {
      if (map.has(requestUrl)) {
        map.delete(requestUrl)
      }
    })
  }

  clear(pageKey: string) {
    this.abortRequest.add(pageKey)

    const requestSet = this.pool.get(pageKey)
    if (!requestSet?.size) return console.log("requestSet为空", pageKey)
    this.pool.delete(pageKey)
    requestSet.forEach((map) => {
      map.forEach((controller) => {
        controller.abort("请求被取消")
      })
    })
  }
  get(pageKey: string) {
    return this.pool.get(pageKey)
  }
  isCanceled(pageKey: string) {
    return this.abortRequest.has(pageKey)
  }
}

export const requestPool = new RequestPool()
