import * as yup from "yup"

export const productSchema = yup.object().shape({
  number: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
})
