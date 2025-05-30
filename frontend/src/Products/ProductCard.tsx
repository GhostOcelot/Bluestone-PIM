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
      <button onClick={onDelete} className={`my-2 px-3 py-2 rounded cursor-pointer bg-red-400 text-white hover:bg-red-600 transition-colors duration-300`}>
        delete product
      </button>
      <button onClick={openModal} className={`my-2 px-3 py-2 rounded cursor-pointer bg-blue-400 text-white hover:bg-blue-600 transition-colors duration-300`}>
        edit product
      </button>
    </div>
  )
}

export default ProductCard
