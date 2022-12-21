import * as moment from 'moment'

export const calcAgeY = (birthdate) => {
    if (!birthdate) return 0

    return moment().diff(moment(birthdate), "years")
}

export const calcAgeM = (birthdate) => {
    if (!birthdate) return 0

    /** Get current ageY */
    const ageY = calcAgeY(birthdate)
    /** Get birthdate in current year */
    const bdInCurrentYear = moment(birthdate).add(ageY, "years")

    /** Calculate and return age in month */
    return moment().diff(moment(bdInCurrentYear), "months")
}
