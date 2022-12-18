export const currencyFormat = (number) => {
    if (!number || number === undefined) return ''

    return number.toLocaleString("en-US")
}
