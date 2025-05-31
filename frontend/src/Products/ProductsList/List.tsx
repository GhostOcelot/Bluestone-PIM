import { Link } from "react-router"
import type { Product } from "../types"

interface Props {
  data: Product[]
}

const List = ({ data }: Props) => {
  return (
    <ul className="w-full max-w-5xl m-4">
      {data.map(({ number, name }) => (
        <Link key={number} className="block text-left p-2 first:border-t border-b border-neutral-200 hover:bg-neutral-100 cursor-pointer" to={`/${name}`}>
          <li>{number}</li>
        </Link>
      ))}
    </ul>
  )
}

export default List
