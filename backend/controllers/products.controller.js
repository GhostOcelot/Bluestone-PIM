import express from "express"
const router = express.Router()
import { ProductService } from "../services/products.service.js"

router.get("/", ProductService.getProducts)
router.get("/:id", ProductService.getProductById)
router.post("/", ProductService.addProduct)
router.put("/:id", ProductService.updateProduct)
router.delete("/:id", ProductService.deleteProduct)

export default router
