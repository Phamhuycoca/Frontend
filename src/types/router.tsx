import type { ReactNode } from "react"

export type AppRoute = {
  path: string
  element: ReactNode
  private?: boolean
  roles?: string[]        // nếu cần phân quyền theo role
  children?: AppRoute[]   // nested route
  index?: boolean
}