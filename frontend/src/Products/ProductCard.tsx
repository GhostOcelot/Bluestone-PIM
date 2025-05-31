import Button from "../components/Button"
import type { Product } from "./types"

interface Props {
  product: Product | undefined
  onDelete: () => void
  openModal: () => void
}

const ProductCard = ({ product, onDelete, openModal }: Props) => {
  if (!product) return null

  const { number, description, images } = product

  return (
    <div className="max-w-[400px] w-1/2 shadow-md rounded-lg p-4 flex flex-col justify-between bg-neutral-100">
      <h1 className="text-xl text-center font-bold mb-4">{number}</h1>
      <p className="text-center">{description}</p>
      {images.map(({ url, name }) => (
        <div key={name} className="bg-gray-300 aspect-[4/3] mt-4 mb-2 flex justify-center items-center">
          <img src={url} alt={name} />
        </div>
      ))}
      <Button label="delete product" onClick={onDelete} className="bg-red-600 my-2" />
      <Button label="edit product" onClick={openModal} className="mt-2" />
    </div>
  )
}

export default ProductCard
