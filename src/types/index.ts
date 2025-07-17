import { object, string, number, boolean, type InferOutput, array } from 'valibot'

// Creamos el borrador del form ya que no tendremos aun el ID
export const DraftProductSchema = object({ 
    name: string(),
    price: number()
})

// En este ya tendremos el ID
export const ProductSchema = object({
    id: number(),
    name: string(),
    price: number(),
    availability: boolean()
})
export const ProductsSchema = array(ProductSchema) /* le decimos que sera en array usando el de product para poder usarlo al recibir los datos de la DB */
export type Product = InferOutput<typeof ProductSchema> /* Inferimos el Schema que creamos al type */