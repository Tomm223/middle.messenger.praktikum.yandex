declare module '*.module.css'
declare module '*.module.scss'
declare module '*.png'
declare module '*.svg'
declare module '*.jpg'
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
