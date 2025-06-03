import { useState } from "react"
import { DataView } from "./types"
import { useAddProduct, useGetProducts, useDisableScroll, useDebounce } from "./hooks"
import Modal from "../components/Modal"
import ProductForm from "./ProductForm"
import Button from "../components/Button"
import Spinner from "../components/Spinner"
import ProductsView from "./ProductsView"

const Products = () => {
  const [dataView, setDataView] = useState(DataView.LIST)
  const [isModalOpen, setModalOpen] = useState(false)
  const [search, setSearch] = useState("")

  const { products, isPending } = useGetProducts(useDebounce(search))
  const addProduct = useAddProduct(() => setModalOpen(false))
  useDisableScroll(isModalOpen)

  return (
    <div className="flex flex-col items-center">
      <Button label="add product" onClick={() => setModalOpen(true)} className="mb-2 w-52" />
      <div>
        <Button
          label="List"
          onClick={() => setDataView(DataView.LIST)}
          className={`${dataView === DataView.CARDS ? "bg-blue-400" : "bg-blue-600"} hover:scale-105 w-24 m-2`}
        />
        <Button
          label="Cards"
          onClick={() => setDataView(DataView.CARDS)}
          className={`${dataView === DataView.LIST ? "bg-blue-400" : "bg-blue-600"} hover:scale-105 w-24 m-2`}
        />
      </div>
      <input
        className="p-2 border border-gray-300 rounded mt-12 mb-2 w-full max-w-5xl"
        placeholder="search products"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {isPending ? <Spinner className="mt-4" /> : <ProductsView products={products} dataView={dataView} />}
      {isModalOpen && (
        <Modal onCloseModal={() => setModalOpen(false)} label="add product">
          <ProductForm onSubmit={addProduct} label="confirm add" />
        </Modal>
      )}
    </div>
  )
}

export default Products
