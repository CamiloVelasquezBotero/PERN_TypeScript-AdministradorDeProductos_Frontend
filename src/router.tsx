import { createBrowserRouter } from 'react-router-dom'
import Layout from './layouts/Layout'
import Products, { loader as productsLoader, action as updateAvailabilityAction } from './views/Products'
import NewProduct, { action as newProductAction } from './views/NewProduct'
import EditProduct, { loader as editProductLoader, action as editProductAction } from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetails'

export const router = createBrowserRouter([/* Declaramos varias rutas en un arreglo y luego cada una en un objeto */
    {
        path: '/',
        element: <Layout />,
        children: [ /* Estos seran lso hijos del layout que le pasemos, sera un arreglo y cada hijo sera un objeto */
            {
                index: true, /* Le decimos que este sera el index */
                element: <Products />,
                loader: productsLoader, /* Los loaders funcionan igual que cuando usamos un useEffect para actualizar algun State y manejar los datos cuando cargue la pagina */
                action: updateAvailabilityAction
            },
            {
                path: 'productos/nuevo',
                element: <NewProduct />,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar', // ROA pattern - Resource-oriented design
                element: <EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                /* En este no renderizamos ningun elemento, pero usamos este path para lanzar el action del componente que eliminara el producto gracias a su action en su Form */
                path: 'productos/:id/eliminar',
                action: deleteProductAction
            }
        ]
    }
])