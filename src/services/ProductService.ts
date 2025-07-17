import { number, parse, pipe, safeParse, string, transform } from "valibot";
import axios from 'axios'
import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../types"
import { toBoolean } from "../utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data:ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price /* Convertimos a numero antes de pasarlo */
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            })
        } else {
            throw new Error('Datos no validos') /* Como estamos en un TryCatch, al momento que encuentre el error lanzara la excepcion */
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const { data } = await axios(url)
        const result = safeParse(ProductsSchema, data.data)
        if(result.success) {
            return result.output /* Retornamos los datos que nos da valibot ya validados */
        } else {
            throw new Error('Hubo un error al obtener los Productos') /* Lnazamos un error directamente para que caiga en el catch */
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductById(id:Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const { data } = await axios(url)
        const result = safeParse(ProductSchema, data.data)
        if(result.success) {
            return result.output /* Retornamos los datos que nos da valibot ya validados */
        } else {
            throw new Error('Hubo un error al obtener los Productos') /* Lnazamos un error directamente para que caiga en el catch */
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct(data:ProductData, id:Product['id']) {
    try {
        const NumberSchema = pipe(string(), transform(Number), number())  /* Convertimos de string a numero con valibot para poderlo */

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: parse(NumberSchema, data.price),
            availability: toBoolean(data.availability.toString())
        })
        if(result.success) {
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output) /* Le pasamos la url y los datos limpios  */
        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id:Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }
}

export async function updateProductAvailability(id:Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}