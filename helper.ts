export const formatCurrency = (number: number) => {
    const IDR = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    });

    return IDR.format(number)
}