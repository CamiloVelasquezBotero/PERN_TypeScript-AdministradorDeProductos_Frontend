import { Link, Form, useActionData, redirect, useLoaderData } from "react-router-dom"; /* Complementos */
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom"; /* Types */
import ErrorMessage from "../components/ErrorMessage";
import { getProductById, updateProduct } from "../services/ProductService";
import type { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params}:LoaderFunctionArgs) { /* En el loader se puede extraer directamente los params sin necesidad de usar (useParams()) */
    if(params.id !== undefined) { /* Comprobamos primero que no venga undefined */
        const product = await getProductById(+params.id) /* Se lo pasamos en numero */
        if(!product) {
            // throw new Response('', {status: 404, statusText: 'No Encontrado'}) /* Podemos mostrarle la pantalla de error si no lo queremos redireccionar */
            return redirect('/') /* Redireccionaos */
        }
        return product /* En los loaders siempre tenemos que retornar algo */
    }
}

// Creamos el (action) que nos servira para usar el (Form) que nos da (react-router), el cual le pasaremos en el router que creamos
export async function action({request, params}:ActionFunctionArgs) { 
    const data = Object.fromEntries(await request.formData()) /* De esta forma obtenemos extraemos los datos de este form */
    
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) { /* Retornamos el error solo si tiene algo */
        return error /* Al retornar algo en el action, esto se puede tomar en el componente con el hook (useActionData) */
    }

    if(params.id !== undefined) { /* Comprobamos que no sea undefined */
        await updateProduct(data, +params.id) /* Esperamos que esta funcion agregue el producto para despues redireccionar al usuario en el return */
    }

    // Al usar Action de Form siempre tenemos que retornar algo
    return redirect('/')  /* Redireccionamos al usuario a la principal una vez terminado */
}

const availabilityOptions = [
   { name: 'Disponible', value: true},
   { name: 'No Disponible', value: false}
]


export default function EditProduct() {
    const product = useLoaderData() as Product
    const error = useActionData() as string /* Gracias a este componente podemos recuperar lo que nos retorne el action del (Form) */
    // const { state } = useLocation() /* Instanciamos para extraer el state que nos manda (navigation) */

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to={"/"}
                    className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500"
                >Volver a Productos</Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Form
                className="mt-10"
                method="POST"
            >

                <ProductForm 
                    product={product}
                />
                
                <div className="mb-4">
                    <label
                        className="text-gray-800"
                        htmlFor="availability"
                    >Disponibilidad:</label>
                    <select 
                        id="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        name="availability"
                        defaultValue={product?.availability.toString()}
                    >
                        {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    )
}
