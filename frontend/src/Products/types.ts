export enum DataView {
  LIST = "List",
  CARDS = "Cards",
}

export interface Product {
  number: string
  name: string
  description: string
  images: { url: string; name: string }[]
}
