import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

export const getTime = (dateTime) => {
    //for formatting a supabase time string like 2021-05-13T09:09:02.810301+00:00
    const dateTimeArray = dateTime.split('T') // ['2021-05-13', '09:09:02.810301+00:00']
    const date = dateTimeArray[0]
    const time = dateTimeArray[1].split('.')[0] // ['09:09:02', '810301+00:00']

    return timeAgo.format(new Date(`${date} ${time}`))
}

export const pluralize = (num, singular, plural) => {
    return num > 1 ? `${num} ${plural}` : `${num} ${singular}`
}