import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import type { Product } from "./types"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router"

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000"

export const useGetProducts = (search?: string) => {
  const { data: getProductsQuery, isPending } = useQuery({
    queryKey: ["products", search],
    queryFn: () => axios.get(`${BASE_URL}/products${search ? `?q=${search}` : ""}`),
  })

  const products: Product[] = getProductsQuery?.data

  return { products, isPending }
}

export const useGetProductById = (id: string) => {
  const { data: getProductByIdQuery } = useQuery({
    queryKey: ["product", id],
    queryFn: () => axios.get(`${BASE_URL}/products/${id}`),
  })

  const product: Product | undefined = getProductByIdQuery?.data

  return product
}

export const useAddProduct = (closeModal: () => void) => {
  const queryClient = useQueryClient()
  const notify = (msg: string) => toast.success(msg)

  const { mutate: addProductMutation } = useMutation({
    mutationFn: (data: Partial<Product>) => axios.post(`${BASE_URL}/products`, data),
    onSuccess: () => {
      closeModal()
      notify("Product added successfully")
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const handleAddProduct = async (data: Partial<Product>) => addProductMutation(data)

  return handleAddProduct
}

export const useUpdateProduct = (id: string, closeModal: () => void) => {
  const queryClient = useQueryClient()
  const notify = (msg: string) => toast.success(msg)

  const { mutate: updateProductMutation } = useMutation({
    mutationFn: (data: Partial<Product>) => axios.put(`${BASE_URL}/products/${id}`, data),
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
    mutationFn: () => axios.delete(`${BASE_URL}/products/${id}`),
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

export const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}
