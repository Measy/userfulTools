import { rootPath, errHandler } from './config'

const xhr = ({url, body = null, method = 'get'}) => {
    const defer = $.Deferred()

    $.ajax({
        type: method,
        url: rootPath + url,
        data: body
        // xhrFields: { //跨域允许带上cookie
        //     withCredentials: [域名]
        // },
        // crossDomian: true
    })
    .done(defer.resolve)
    .fail(errHandler)

    return defer.promise()
}

export default xhr
