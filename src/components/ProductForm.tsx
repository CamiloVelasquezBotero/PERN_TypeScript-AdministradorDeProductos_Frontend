import type { Product } from "../types"

type ProductFormProps = {
    product?: Product /* Con el optional property, para decirle que no siempre puede tenerlo ya que se lo pasaremos a newProduct tambien */
}

export default function ProductForm({product}:ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                    defaultValue={product?.name}
                // /* Como estamso usando react-router le colocamos un (defaultValue) por que si le colocaramos un value
                // tendriamos que ponerle un (onChange) y estamso usando directamente los datos que nos manda el navigate en el state */
                // defaultValue={state.product.name}
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                    defaultValue={product?.price}
                // /* Como estamso usando react-router le colocamos un (defaultValue) por que si le colocaramos un value
                // tendriamos que ponerle un (onChange) y estamso usando directamente los datos que nos manda el navigate en el state */
                // defaultValue={state.product.price}
                />
            </div>
        </>
    )
}
