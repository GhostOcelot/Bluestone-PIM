import { AiOutlineClose } from "react-icons/ai"
import type { Product } from "./types"
import { useDisableScroll } from "./hooks"
import type { ReactNode } from "react"

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
  label?: string
  children: ReactNode
}

const EditModal = ({ isModalOpen, label, onCloseModal, children }: Props) => {
  useDisableScroll(isModalOpen)

  return (
    <div
      className={`${isModalOpen ? "visible" : "hidden"} fixed overflow-hidden top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center`}
      onClick={onCloseModal}
    >
      <div className="relative bg-white rounded-xl p-6 w-[400px] max-w-full mx-8" onClick={(e) => e.stopPropagation()}>
        {label && <h1 className="text-center text-xl font-semibold">{label}</h1>}
        <AiOutlineClose
          className="absolute top-4 right-4 w-6 h-6 p-1 rounded-full cursor-pointer flex justify-center items-center hover:bg-gray-200 transition-colors duration-300"
          onClick={onCloseModal}
        />
        {children}
      </div>
    </div>
  )
}

export default EditModal
