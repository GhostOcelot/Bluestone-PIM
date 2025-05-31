import { useNavigate, useParams } from "react-router"
import { useGetProductById, useUpdateProduct, useDeleteProduct } from "./hooks"
import { useState } from "react"
import EditModal from "./ProductModal"
import ProductCard from "./ProductCard"
import ProductForm from "./ProductForm"
import Button from "../components/Button"

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product } = useGetProductById(id!)
  const [isModalOpen, setModalOpen] = useState(false)
  const deleteProduct = useDeleteProduct(id!)
  const updateProduct = useUpdateProduct(id!, () => setModalOpen(false))

  return (
    <div className="flex flex-col items-center">
      <Button label="back to product list" onClick={() => navigate("/")} className="mb-4" />
      <ProductCard product={product} onDelete={deleteProduct} openModal={() => setModalOpen(true)} />
      <EditModal isModalOpen={isModalOpen} label="Edit Product" onCloseModal={() => setModalOpen(false)}>
        <ProductForm onSubmit={updateProduct} product={product} label="confirm edit" />
      </EditModal>
    </div>
  )
}

export default ProductDetails
