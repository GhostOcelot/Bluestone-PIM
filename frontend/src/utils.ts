import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { BusinessData, Category } from "./Products/types"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(...inputs))
}

export const getYearsFromData = (data: BusinessData[]) => [...new Set(data.map((item) => item.year))].sort((a, b) => a - b)

const allMonths = Array.from({ length: 12 }, (_, i) => i + 1)
const monthMap = new Map<number, string>([
  [1, "jan"],
  [2, "feb"],
  [3, "mar"],
  [4, "apr"],
  [5, "may"],
  [6, "jun"],
  [7, "jul"],
  [8, "aug"],
  [9, "sep"],
  [10, "oct"],
  [11, "nov"],
  [12, "dec"],
])

export const groupDataBy = (data: BusinessData[], year: number, column: Category) => {
  const filtered = data.filter((item) => item.year === year)

  const grouped = filtered.reduce<
    Record<
      string,
      {
        sales: number[]
        units: number[]
        satisfaction: number[]
        conversion_rate: number[]
      }
    >
  >((acc, curr) => {
    const key = column === "month" ? curr.month.toString() : curr[column]
    if (!acc[key]) {
      acc[key] = { sales: [], units: [], satisfaction: [], conversion_rate: [] }
    }
    acc[key].sales.push(curr.sales)
    acc[key].units.push(curr.units)
    acc[key].satisfaction.push(curr.satisfaction)
    acc[key].conversion_rate.push(curr.conversion_rate)
    return acc
  }, {})

  const expectedKeys = column === "month" ? allMonths.map((m) => m.toString()) : Array.from(new Set(data.map((item) => item[column])))

  const average = (arr: number[]) => (arr.length ? +(arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(2) : 0)

  return expectedKeys.map((key) => {
    const values = grouped[key] || { sales: [], units: [], satisfaction: [], conversion_rate: [] }
    return {
      name: column === "month" ? (monthMap.get(Number(key)) ?? key) : key,
      sales: +values.sales.reduce((a, b) => a + b, 0).toFixed(2),
      units: values.units.reduce((a, b) => a + b, 0),
      satisfaction: average(values.satisfaction),
      conversion_rate: average(values.conversion_rate),
    }
  })
}

export const formatLabel = (key: string) => {
  switch (key) {
    case "sales":
      return "Sales"
    case "units":
      return "Units"
    case "conversion_rate":
      return "Conversion Rate"
    case "satisfaction":
      return "Satisfaction"
    default:
      return key
  }
}
