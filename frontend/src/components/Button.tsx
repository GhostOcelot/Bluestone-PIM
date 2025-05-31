import { cn } from "../utils"

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  label: string
  className?: string
}

const Button = ({ label, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(`px-3 py-2 rounded cursor-pointer bg-blue-600 text-white scale-100 hover:scale-103 transition-scale duration-300 ${className}`)}
    >
      {label}
    </button>
  )
}

export default Button
