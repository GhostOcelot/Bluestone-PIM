import { useNavigate, useParams } from "react-router"
import { useGetProductById, useUpdateProduct, useDeleteProduct } from "./hooks"
import { useState } from "react"
import EditModal from "./ProductModal"
import ProductCard from "./ProductCard"
import ProductForm from "./ProductForm"

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { product } = useGetProductById(id!)
  const [isModalOpen, setModalOpen] = useState(false)
  const deleteProduct = useDeleteProduct(id!)
  const updateProduct = useUpdateProduct(id!, () => setModalOpen(false))

  return (
    <div className="flex flex-col items-center">
      <ProductCard product={product} onDelete={deleteProduct} openModal={() => setModalOpen(true)} />
      <button
        onClick={() => navigate("/")}
        className={`mt-4 px-3 py-2 rounded cursor-pointer bg-blue-400 text-white hover:bg-blue-600 transition-colors duration-300`}
      >
        back to product list
      </button>
      <EditModal isModalOpen={isModalOpen} label="Edit Product" onCloseModal={() => setModalOpen(false)}>
        <ProductForm onSubmit={updateProduct} product={product} label="confirm edit" />
      </EditModal>
    </div>
  )
}

export default ProductDetails
