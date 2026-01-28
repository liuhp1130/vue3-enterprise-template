import { request } from "@/utils/request"
interface UserInfo {
  id: number
  name: string
}

export const userApi = {
  getUserInfo: (pageKey?: string) => {
    return request<UserInfo>({
      url: "/user/info",
      method: "get",
      pageKey,
    })
  },
}
