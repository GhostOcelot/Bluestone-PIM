import { Link } from "react-router"
import type { Product } from "../types"

interface Props {
  data: Product[]
}

const Cards = ({ data }: Props) => {
  return (
    <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {data.map(({ number, name, description }) => (
        <div key={number} className="h-full min-h-[200px] bg-neutral-100 shadow-md rounded-lg p-4 flex flex-col justify-between">
          <div className="h-1/2">
            <h2 className="text-xl text-center font-semibold mb-2 hover:text-red-700 transition-colors duration-300">
              <Link to={`/${name}`}> {number}</Link>
            </h2>
            <p className="text-gray-700 text-center mb-4">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cards
