export type ToastType = 'success' | 'error' | 'info' | 'warning'
export type ToastArg = {message?: string; type?: ToastType; header?: string}
export type ItemObject = {
  key: number
  message: string
  type: ToastType
  header?: string
}

export interface ToastProps {
  child: (arg: (toastObj: ToastArg) => void) => void
  dark?: boolean
  message?: string
  type?: ToastType
  timeout?: number
  style?: React.CSSProperties
  closeIcon?: boolean
  dismissOnClick?: boolean
  noHeader?: boolean
}

export type ToastItemProps = {
  message?: string
  dark?: boolean
  type?: ToastType
  style?: React.CSSProperties
  keyValue?: number
  timeout?: number
  closeIcon?: boolean
  closeToast?: boolean
  header?: string
  noHeader?: boolean
}

export type DarkStyle = {
  style?: React.CSSProperties
}
