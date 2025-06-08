import { AiOutlineClose } from "react-icons/ai"
import type { ReactNode } from "react"
import { FocusTrap } from "focus-trap-react"

interface Props {
  onCloseModal: () => void
  label?: string
  children: ReactNode
}

const Modal = ({ label, onCloseModal, children }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Escape") onCloseModal()
  }

  // add again

  return (
    <FocusTrap>
      <div
        className={`
        fixed overflow-hidden top-0 left-0 w-full h-full bg-gray-300/50 flex justify-center items-center`}
        onClick={onCloseModal}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
      >
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div className="relative bg-white rounded-xl p-6 w-[400px] max-w-full mx-8" onClick={(e) => e.stopPropagation()}>
          {label && <h1 className="text-center text-xl font-semibold">{label}</h1>}
          <button
            onClick={onCloseModal}
            className="focus:ring absolute top-4 right-4 w-6 h-6 p-1 rounded-full cursor-pointer flex justify-center items-center hover:bg-gray-200 transition-colors duration-300"
          >
            <AiOutlineClose />
          </button>
          {children}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
