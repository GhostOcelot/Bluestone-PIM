import { useNavigate, useParams } from "react-router"
import { useGetProductById, useUpdateProduct, useDeleteProduct, useDisableScroll } from "../hooks"
import { useState } from "react"
import Modal from "../../components/Modal"
import ProductCard from "./ProductCard"
import ProductForm from "../ProductForm"
import Button from "../../components/Button"

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useGetProductById(id!)
  const [isModalOpen, setModalOpen] = useState(false)
  const deleteProduct = useDeleteProduct(id!)
  const updateProduct = useUpdateProduct(id!, () => setModalOpen(false))

  useDisableScroll(isModalOpen)

  return (
    <div className="flex flex-col items-center">
      <Button label="back to product list" onClick={() => navigate("/")} className="mb-4 w-52" />
      <ProductCard product={product} onDelete={deleteProduct} openModal={() => setModalOpen(true)} />
      {isModalOpen && (
        <Modal label="Edit Product" onCloseModal={() => setModalOpen(false)}>
          <ProductForm onSubmit={updateProduct} product={product} label="confirm edit" />
        </Modal>
      )}
    </div>
  )
}

export default ProductDetails
