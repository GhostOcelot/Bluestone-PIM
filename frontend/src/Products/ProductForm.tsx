import type { Product } from "./types"
import { yupResolver } from "@hookform/resolvers/yup"
import { productSchema } from "./validationSchema"
import { useForm } from "react-hook-form"
import { useEffect } from "react"

interface Props {
  onSubmit: (data: Partial<Product>) => void
  product?: Product
  label: string
}

const ProductForm = ({ onSubmit, product, label }: Props) => {
  const { number, description } = product || {}

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Pick<Product, "number" | "description">>({
    resolver: yupResolver(productSchema),
    defaultValues: { number, description },
  })

  useEffect(() => {
    reset({ number, description })
  }, [product, reset, number, description])

  return (
    <div className="flex justify-center">
      <form
        className="m-8 flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(() => {
          onSubmit(getValues())
          reset()
        })}
      >
        <input {...register("number")} type="text" placeholder="name" className="p-2 border border-gray-300 rounded" />
        {errors.number && <p className="text-red-500 text-xs mb-1">{errors.number.message}</p>}
        <textarea {...register("description")} placeholder="description" className="p-2 border border-gray-300 rounded h-40" />
        {errors.description && <p className="text-red-500 text-xs mb-1">{errors.description.message}</p>}
        <button className="p-2 rounded cursor-pointer bg-blue-400 text-white hover:bg-blue-600 transition-colors duration-300">{label}</button>
      </form>
    </div>
  )
}

export default ProductForm
