export function formatCurrency(amount:number) { /* Formateamos los prcesios para mostrrlos correctamente */
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

export function toBoolean(str:string) {
    return str.toLowerCase() === 'true' // Si coincide devolvera un True si no, devolvera un False
}