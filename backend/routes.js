import express from "express"
import productsRouter from "./controllers/products.controller.js"

const router = express.Router()

router.use("/products", productsRouter)

export default router
