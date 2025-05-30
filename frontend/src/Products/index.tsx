import { Cards, List } from "./ProductsList"
import { useState } from "react"
import { DataView } from "./types"
import { useAddProduct, useGetProducts } from "./hooks"
import ProductModal from "./ProductModal"
import ProductForm from "./ProductForm"

const Products = () => {
  const [dataView, setDataView] = useState(DataView.LIST)
  const [isModalOpen, setModalOpen] = useState(false)

  const { products } = useGetProducts()
  const addProduct = useAddProduct(() => setModalOpen(false))

  const baseStyles = "m-2 p-2 rounded cursor-pointer text-white hover:bg-blue-600 transition-colors duration-300"

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Products</h1>
      <button onClick={() => setModalOpen(true)} className={`${baseStyles} bg-blue-400 w-52`}>
        add product
      </button>
      <div>
        <button onClick={() => setDataView(DataView.LIST)} className={`${dataView === DataView.CARDS ? "bg-blue-400" : "bg-blue-600"} ${baseStyles} w-24`}>
          List
        </button>
        <button onClick={() => setDataView(DataView.CARDS)} className={`${dataView === DataView.LIST ? "bg-blue-400" : "bg-blue-600"} ${baseStyles} w-24`}>
          Cards
        </button>
      </div>
      {products ? dataView === DataView.CARDS ? <Cards data={products} /> : <List data={products} /> : <div className="my-4">No items to display</div>}
      <ProductModal isModalOpen={isModalOpen} onCloseModal={() => setModalOpen(false)} label="add product">
        <ProductForm onSubmit={addProduct} label="confirm add" />
      </ProductModal>
    </div>
  )
}

export default Products
