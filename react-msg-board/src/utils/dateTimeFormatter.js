/**
 * 个位数前加零
 * @param  {Number} val
 * @return {String/Number}
 */
const zeroFill = val => val >= 10 ? val : '0' + val

/**
 * 格式化时间
 * @param  {Number} time 时间戳
 * @param  {Number} type 格式化类型
 * @return {String}
 */
export default function dateTimeFormatter(time, type) {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let second = date.getSeconds()

    switch (type) {
        case 0: // 01-05
            return `${zeroFill(month)}-${zeroFill(day)}`
        case 1: // 11:12
            return `${zeroFill(hours)}:${zeroFill(minutes)}`
        case 2: // 2015-01-05
            return `${year}-${zeroFill(month)}-${zeroFill(day)}`
        case 3: // 2015-01-05 11:12
            return `${year}-${zeroFill(month)}-${zeroFill(day)}  ${zeroFill(hours)}:${zeroFill(minutes)}`
        default: // 2015-01-05 11:12:13
            return `${year}-${zeroFill(month)}-${zeroFill(day)}  ${zeroFill(hours)}:${zeroFill(minutes)}:${zeroFill(second)}`
    }
}
