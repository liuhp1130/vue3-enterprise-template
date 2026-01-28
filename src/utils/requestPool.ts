type RequestController = AbortController
class RequestPool {
  private pool = new Map<string, Set<RequestController>>()

  add(pageKey: string, controller: RequestController) {
    if (!this.pool.has(pageKey)) {
      this.pool.set(pageKey, new Set())
    }
    this.pool.get(pageKey)?.add(controller)
  }

  remove(pageKey: string, controller: RequestController) {
    this.pool.get(pageKey)?.delete(controller)
  }

  clear(pageKey: string) {
    const controllers = this.pool.get(pageKey)
    if (!controllers) return

    controllers.forEach((controller) => {
      controller.abort()
    })

    this.pool.delete(pageKey)
  }
}

export const requestPool = new RequestPool()
