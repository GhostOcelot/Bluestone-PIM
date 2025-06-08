import { useEffect, useState } from "react"
import data from "./mock_business_data.json"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { formatLabel, getYearsFromData, groupDataBy } from "../utils"
import type { Category, Column } from "./types"

const Chart = () => {
  const lastYear = getYearsFromData(data)[getYearsFromData(data).length - 1]

  const [year, setYear] = useState(lastYear)
  const [category, setCategory] = useState<Category>("month")
  const [column, setColumn] = useState<Column>("sales")
  const [businessData, setBusinessData] = useState(groupDataBy(data, year, category))

  useEffect(() => {
    setBusinessData(groupDataBy(data, year, category))
  }, [year, category])

  return (
    <>
      <select
        name="category"
        id="category"
        onChange={(e) => setCategory(e.target.value as Category)}
        className="w-52 border-1 border-gray-300 p-2 rounded-md mb-2"
      >
        <option value="month">Month</option>
        <option value="region">Region</option>
        <option value="category">Category</option>
      </select>

      <select name="column" id="column" onChange={(e) => setColumn(e.target.value as Column)} className="w-52 border-1 border-gray-300 p-2 rounded-md mb-2">
        <option value="sales">Sales</option>
        <option value="units">Units</option>
        <option value="conversion_rate">Conversion Rate</option>
        <option value="satisfaction">Satisfaction</option>
      </select>

      <select
        name="year"
        id="year"
        defaultValue={lastYear}
        onChange={(e) => setYear(Number(e.target.value))}
        className="w-52 border-1 border-gray-300 p-2 rounded-md mb-2"
      >
        {getYearsFromData(data).map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <div className="w-full max-w-[600px] aspect-[4/3] mr-4 my-4">
        <ResponsiveContainer width="100%">
          <BarChart
            data={businessData.map((entry) => ({
              ...entry,
              value: entry[column],
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" fontSize={12} />
            <YAxis dataKey={column} fontSize={12} />
            <Tooltip formatter={(value: number) => [value, formatLabel(column)]} />
            <Bar dataKey="value" fill="#06f" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export default Chart
