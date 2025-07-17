import { Link, Form, useActionData, redirect } from "react-router-dom"; /* Complementos */
import type { ActionFunctionArgs } from "react-router-dom"; /* Types */
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

// Creamos el (action) que nos servira para usar el (Form) que nos da (react-router), el cual le pasaremos en el router que creamos
export async function action({request}:ActionFunctionArgs) { 
    const data = Object.fromEntries(await request.formData()) /* De esta forma obtenemos extraemos los datos de este form */
    
    let error = ''
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios'
    }
    if(error.length) { /* Retornamos el error solo si tiene algo */
        return error /* Al retornar algo en el action, esto se puede tomar en el componente con el hook (useActionData) */
    }

    await addProduct(data) /* Esperamos que esta funcion agregue el producto para despues redireccionar al usuario en el return */

    // Al usar Action de Form siempre tenemos que retornar algo
    return redirect('/')  /* Redireccionamos al usuario a la principal una vez terminado */
}

export default function NewProduct() {
    const error = useActionData() as string /* Gracias a este componente podemos recuperar lo que nos retorne el action del (Form) */

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
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

                <ProductForm />

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    )
}
