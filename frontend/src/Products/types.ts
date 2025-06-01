export enum DataView {
  LIST = "List",
  CARDS = "Cards",
}

interface Image {
  url: string
  name: string
}

export interface Product {
  number: string
  name: string
  description: string
  images: Image[]
}
