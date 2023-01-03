import * as moment from "moment"

export const currencyFormat = (number) => {
    if (!number || number === undefined) return ''

    return number.toLocaleString("en-US")
}

export const thdateFormat = (date) => {
    if (!date || date === undefined) return ''

    return moment(date).format('DD/MM/YYYY')
}

export const thdateBEFormat = (dateStr) => {
    if (!dateStr || dateStr === undefined) return ''

    const [year, month, day] = dateStr.split('-')

    return `${day}/${month}/${(parseInt(year)+543)}`
}

export const dbdateFormat = (date) => {
    if (!date || date === undefined) return ''

    return moment(date).format('YYYY-MM-DD')
}

export const dbdateBEFormat = (dateStr) => {
    if (!dateStr || dateStr === undefined) return ''

    const [day, month, year] = dateStr.split('/')

    return `${(parseInt(year)-543)}-${month}-${day}`
}
