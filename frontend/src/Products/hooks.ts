import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { Product } from "./types"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

export const useGetProducts = () => {
  const { data: getProductsQuery, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/products`),
  })

  const products: Product[] = getProductsQuery?.data

  return { products, isPending }
}

export const useGetProductById = (id: string) => {
  const { data: getProductByIdQuery, isPending } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}/products/${id}`),
  })

  const product: Product | undefined = getProductByIdQuery?.data

  return { product, isPending }
}

export const useAddProduct = (closeModal: () => void) => {
  const queryClient = useQueryClient()
  const notify = (msg: string) => toast.success(msg)

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: (data: Partial<Product>) => axios.post(`${import.meta.env.VITE_BASE_URL}/products`, data),
    onSuccess: () => {
      closeModal()
      notify("Product added successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const handleUpdateProduct = async (data: Partial<Product>) => updateProductMutation(data)

  return handleUpdateProduct
}

export const useUpdateProduct = (id: string, closeModal: () => void) => {
  const queryClient = useQueryClient()
  const notify = (msg: string) => toast.success(msg)

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: (data: Partial<Product>) => axios.put(`${import.meta.env.VITE_BASE_URL}/products/${id}`, data),
    onSuccess: () => {
      closeModal()
      notify("Product edited successfully")
      queryClient.invalidateQueries({ queryKey: ["product", id] })
    },
  })

  const handleUpdateProduct = async (data: Partial<Product>) => updateProductMutation(data)

  return handleUpdateProduct
}

export const useDeleteProduct = (id: string) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const notify = (msg: string) => toast.success(msg)

  const { mutate: deleteProductMutation } = useMutation({
    mutationFn: () => axios.delete(`${import.meta.env.VITE_BASE_URL}/products/${id}`),
    onSuccess: () => {
      notify("Product deleted successfully")
      navigate("/")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const handleDeleteProduct = () => deleteProductMutation()

  return handleDeleteProduct
}

export const useDisableScroll = (isModalOpen: boolean) => {
  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [isModalOpen])
}
