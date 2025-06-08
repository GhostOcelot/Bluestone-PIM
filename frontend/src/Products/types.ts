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

export interface BusinessData {
  month: number
  year: number
  region: string
  category: string
  sales: number
  units: number
  conversion_rate: number
  satisfaction: number
}
export type Category = "month" | "region" | "category"
export type Column = "sales" | "units" | "conversion_rate" | "satisfaction"
