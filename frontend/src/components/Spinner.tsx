import { SpinnerCircular } from "spinners-react"

const Spinner = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SpinnerCircular color="#00f" secondaryColor="#ccc" />
    </div>
  )
}

export default Spinner
