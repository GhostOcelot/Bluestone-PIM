import { render, screen, fireEvent } from "@testing-library/react"
import type { Product } from "./types"
import ProductCard from "./ProductDetails/ProductCard"
import { MemoryRouter } from "react-router"
import List from "./ProductsList/List"
import ProductForm from "./ProductForm"

const mockProduct: Product = {
  number: "123",
  name: "Test Product",
  description: "A test product",
  images: [{ url: "http://example.com/image.jpg", name: "image.jpg" }],
}

const mockProducts: Product[] = [
  {
    number: "Product 1",
    name: "1",
    description: "First product",
    images: [],
  },
  {
    number: "Product 2",
    name: "2",
    description: "Second product",
    images: [],
  },
]

describe("List", () => {
  it("renders all products", () => {
    render(
      <MemoryRouter>
        <List data={mockProducts} />
      </MemoryRouter>,
    )
    const listItems = screen.queryAllByRole("listitem")
    expect(listItems).toHaveLength(2)
    expect(screen.getByText("Product 2")).toBeInTheDocument()
    expect(screen.getByText("Product 3")).toBeInTheDocument()
  })

  it("shows empty state if no products", () => {
    render(
      <MemoryRouter>
        <List data={[]} />
      </MemoryRouter>,
    )
    const listItems = screen.queryAllByRole("listitem")
    expect(listItems).toHaveLength(0)
  })
})

describe("ProductCard", () => {
  it("shows image preview if product has images", () => {
    render(<ProductCard product={mockProduct} onDelete={vi.fn()} openModal={vi.fn()} />)
    expect(screen.getByAltText("image.jpg")).toBeInTheDocument()
    expect(screen.getByAltText("image.jpg")).toHaveAttribute("src", "http://example.com/image.jpg")
  })

  it("does not show image preview if product has no images", () => {
    const productNoImages = { ...mockProduct, images: [] }
    render(<ProductCard product={productNoImages} onDelete={vi.fn()} openModal={vi.fn()} />)
    expect(screen.queryByAltText("image.jpg")).not.toBeInTheDocument()
  })
})

describe("ProductForm", () => {
  it("renders form with default values", () => {
    render(<ProductForm product={mockProduct} onSubmit={vi.fn()} label="label" />)
    expect(screen.getByPlaceholderText("name")).toHaveValue("123")
    expect(screen.getByPlaceholderText("description")).toHaveValue("A test product")
  })

  it("shows validation errors on submit with empty fields", async () => {
    render(<ProductForm product={mockProduct} onSubmit={vi.fn()} label="label" />)
    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "" } })
    fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "" } })
    fireEvent.click(screen.getByText(/label/i))
    expect(await screen.findAllByText(/required/i)).toHaveLength(2)
  })

  it("calls onSubmit with correct data", async () => {
    const handleSubmit = vi.fn()
    render(<ProductForm product={mockProduct} onSubmit={handleSubmit} label="label" />)
    fireEvent.change(screen.getByPlaceholderText("name"), { target: { value: "456" } })
    fireEvent.change(screen.getByPlaceholderText("description"), { target: { value: "Updated" } })
    expect(await screen.findByDisplayValue("456")).toBeInTheDocument()
    expect(await screen.findByDisplayValue("Updated")).toBeInTheDocument()
  })

  it("renders empty form fields if product is not provided", () => {
    render(<ProductForm product={undefined} onSubmit={vi.fn()} label="label" />)
    const nameInput = screen.getByPlaceholderText("name") as HTMLInputElement
    const descriptionInput = screen.getByPlaceholderText("description") as HTMLTextAreaElement
    expect(nameInput.value).toBe("")
    expect(descriptionInput.value).toBe("")
  })
})
