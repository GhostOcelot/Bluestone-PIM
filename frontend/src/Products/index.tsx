import Cards from "./ProductsList/Cards"
import List from "./ProductsList/List"
import { useState } from "react"
import { DataView } from "./types"
import { useAddProduct, useGetProducts, useDisableScroll } from "./hooks"
import Modal from "../components/Modal"
import ProductForm from "./ProductForm"
import Button from "../components/Button"

const Products = () => {
  const [dataView, setDataView] = useState(DataView.LIST)
  const [isModalOpen, setModalOpen] = useState(false)

  const products = useGetProducts()
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
      {products ? dataView === DataView.CARDS ? <Cards data={products} /> : <List data={products} /> : <div className="my-4">No items to display</div>}
      {isModalOpen && (
        <Modal onCloseModal={() => setModalOpen(false)} label="add product">
          <ProductForm onSubmit={addProduct} label="confirm add" />
        </Modal>
      )}
    </div>
  )
}

export default Products
