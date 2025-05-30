import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router"
import { createRoot } from "react-dom/client"
import Layout from "./Layout.tsx"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { lazy, Suspense } from "react"
import Spinner from "./components/Spinner.tsx"

const Products = lazy(() => import("./Products/index.tsx"))
const ProductDetails = lazy(() => import("./Products/ProductDetails.tsx"))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Products /> },
      { path: "/:id", element: <ProductDetails /> },
    ],
  },
])

const queryClient = new QueryClient()

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Spinner />}>
      <RouterProvider router={router} />
    </Suspense>
  </QueryClientProvider>,
)
