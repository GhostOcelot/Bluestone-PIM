import { SpinnerCircular } from "spinners-react"
import { cn } from "../utils"

interface Props {
  className?: string
}

const Spinner = ({ className }: Props) => {
  return (
    <div className={cn("flex justify-center items-center", className)}>
      <SpinnerCircular color="#00f" secondaryColor="#ccc" />
    </div>
  )
}

export default Spinner
