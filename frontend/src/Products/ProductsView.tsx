import Cards from "./ProductsList/Cards"
import List from "./ProductsList/List"
import type { Product } from "./types"
import { DataView } from "./types"

interface Props {
  products: Product[]
  dataView: DataView
}

const ProductsView = ({ products, dataView }: Props) => {
  if (!products || products.length === 0) {
    return <div className="my-4">No items to display</div>
  }

  return dataView === DataView.CARDS ? <Cards data={products} /> : <List data={products} />
}

export default ProductsView
