import { v4 as uuidv4 } from "uuid"

export class ProductService {
  static products = [
    {
      name: "b0006se5bq",
      number: "singing coach unlimited",
      description: "singing coach unlimited - electronic learningproducts (win me nt 2000 xp)",
      images: [
        {
          url: "https://picsum.photos/400/300",
          name: "singing coach",
        },
        {
          url: "https://broken.link.for.testing.notexistingtopleveldomain/400/300",
          name: "front side",
        },
      ],
    },
    {
      name: "b00021xhzw",
      number: "adobe after effects professional 6.5 upgrade from standard to professional",
      description:
        "upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets",
      images: [],
    },
    {
      name: "b00021xhzv",
      number: "domino designer/developer v5.0",
      description:
        "reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages",
      images: [
        {
          url: "https://picsum.photos/400/300",
          name: "cover",
        },
      ],
    },
  ]

  static getProducts = (req, res) => {
    res.send(ProductService.products)
  }

  static getProductById = (req, res) => {
    const productId = req.params.id
    const product = ProductService.products.find((p) => p.name === productId)
    if (!product) {
      return res.status(404).send({ error: "Product not found" })
    }
    res.send(product)
  }

  static updateProduct = (req, res) => {
    const { number, description } = req.body
    const { id } = req.params
    const product = ProductService.products.find((p) => p.name === id)

    if (!product) {
      return res.status(404).send({ error: "Product not found" })
    }

    const updatedProduct = { ...product, number, description }
    ProductService.products = ProductService.products.map((p) => (p.name === updatedProduct.name ? updatedProduct : p))

    res.send({ message: "Product updated successfully" })
  }

  static deleteProduct = (req, res) => {
    const productId = req.params.id

    ProductService.products = ProductService.products.filter((p) => p.name !== productId)

    res.send({ message: "Product deleted successfully" })
  }

  static addProduct = (req, res) => {
    const { number, description } = req.body

    if (!number || !description) {
      return res.status(400).send({ error: "Name, number, and description are required" })
    }

    const newProduct = {
      name: uuidv4(),
      number,
      description,
      images: [
        {
          url: "https://picsum.photos/400/300",
          name: "default image",
        },
      ],
    }

    ProductService.products.push(newProduct)

    res.send({ message: "Product added successfully" })
  }
}
