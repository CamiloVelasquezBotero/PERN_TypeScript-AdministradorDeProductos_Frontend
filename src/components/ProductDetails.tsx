import { Form, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from 'react-router-dom'
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { deleteProduct } from '../services/ProductService'

type ProductDetailsProps = {
    product: Product
}

export async function action({params}:ActionFunctionArgs) {
    if(params.id !== undefined) {
        await deleteProduct(+params.id)
    }

    return redirect('/') /* Una vez eleminado lo retornamos a la pagina principal */
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const fetcher = useFetcher() /* Este se utiliza para no tener que redireccionar al usuario de nuevo a l apagina para que el loader cargue de nuevo los productos y se actualice */
    const navigate = useNavigate()
    const isAvailable = product.availability

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form
                    method='post'
                >
                    <button
                        type='submit'
                        name='id'
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-sm uppercase font-bold w-full
                            border border-black-100 cursor-pointer`}
                    >    
                        {isAvailable ? 'Disponible' : 'No Diponible'}
                    </button>
                    {/* <input type="hidden" name='id' value={product.id} /> // Podriamos pasarle el id de esta forma y se extra desde el formData*/}
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button 
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        // onClick={() => navigate(`/productos/${product.id}/editar`, {
                        //     state: { /* (useNavigate) permite pasarle un state a la ruta que redireccionaremos para posterior mente recuperarlo con (useLocation()) */
                        //         product: product
                        //     }
                        // })}
                        className='bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer'
                    >Editar</button>

                    <Form 
                        className='w-full' 
                        method='POST'
                        action={`productos/${product.id}/eliminar`} /* Como este es un componente, tenemos que colocarle la ruta directamente al Form de react router */
                        // El onSUbmit se ejecutara antes que el action, lo cual lo usaremos para confirmar la eliminacion
                        onSubmit={(e) => {
                            if(!confirm('¿Eliminar?')) {
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value={'Eliminar'}
                            className='bg-red-600 hover:bg-red-500 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer'
                        />
                    </Form>
                </div>
            </td>
        </tr>
    )
}
