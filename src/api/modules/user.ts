import { request } from "@/utils/request"
interface UserInfo {
  id: number
  name: string
}

export const userApi = {
  // 获取煤的品种列表
  getCoalTypeList: (pageKey?: string) => {
    return request<UserInfo>({
      url: "/dict/items/9",
      method: "post",
      pageKey,
      priority: 100,
    })
  },

  // 获取当前所有开放专区的列表接口
  getZoneList: (pageKey?: string) => {
    return request({
      url: `/zone/list`,
      method: "post",
      pageKey,
      priority: 20,
    })
  },
}
