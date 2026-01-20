 import {request} from '@/utils/request'

 export interface UserInfo{
    id:number,
    name:string
 }

 export function getUserInfo(){
    return request<UserInfo>({
        url:'/user/info',
        method:'get'
    })
 }