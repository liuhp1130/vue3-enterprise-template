// 原则：业务层不直接使用import.meta.env，而是通过env.ts导出的环境变量

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
export const ENV = import.meta.env.VITE_APP_ENV
export const IS_DEV = ENV === 'dev'
export const IS_PROD = ENV === 'prod'