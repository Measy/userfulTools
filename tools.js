/**
 * Cteate a callback list using the following parameters:
 * 
 *  options: an optional list of space-seperated options that will change how
 *          the callback list behaves or a more traditional option object
 */
Callbacks = function (options) {

}


var noWhiteSym = (/[^\x20\t\r\n\f]+/g);

/**
 * 将配置字符串转成配置对象
 * @param {String} space-separate option config String
 * @returns {Object} option config Object
 */
function createOptions(options) {
    var object = {};
    each(options, match(noWhiteSym) || [], function (_, flag) {
        object[flag] = true;
    });
    return object;
}

/**
 * customer .each() for object or array
 * @param {Object|Array} an object or array to iterate
 * @param {Function(index,element)} callback function in iterate;index & element will pass in
 * @returns {Object|Array} the obj which every item run in callback 
 */
function each(obj, callback) {
    var i, length = 0;

    if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            //用callback的返回值做循环控制，来提前结束each
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}

Tools = {};

/**
 * 提供深度复制功能
 * @argument (obj1)|(true,obj1)的时候向Tools对象扩展obj1的内容
 * @argument (obj1,obj2..objn)|(true,obj1,obj2..objn) 将obj2...objn的内容合并到obj1上
 * @param [boolean] true的时候为深度复制
 */
Tools.extend = function () {
    var options,    //指向某个源对象
        name,   //表示源对象的某个属性名
        src,    //表示目标对象的某个属性的原始值
        copy,   //表示源对象某个属性的值
        copyIsArray,    //指示变量copy是否是数组
        clone,  //表示深度复制时原始值的修正值
        target = arguments[0] || {},    //目标对象
        i = 1,  //源对象的起始下标
        length = arguments.length,  //参数个数
        deep = false;   //是否执行深度复制，默认值为false

    //Handle a deep copy situation
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {};
        i++;
    }

    //Handle case when target is a string or something(possible extend in this)
    if (typeof target !== "object") {
        target = {};
    }

    //Extend Tolls itself if only one argument is passed
    if (i === length) {
        target = this;
        i--;
    }

    for (; i < length; i++) {
        //only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {

            //extend the object
            for (name in options) {
                src = target[name];
                copy = options[name];

                //prevent never-edning loop
                if (target === copy) {
                    continue;
                }

                //Recurse if we merging plain objects or arrays
                if (deep && copy && (Tools.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    if (copyIsArray) {
                        copyIsArray = false;
                        clone = src && Array.isArray(src) ? src : [];
                    } else {
                        clone = src && Tools.isPlainObject(src) ? src : {};
                    }

                    //clone them
                    target[name] = Tools.extend(deep, clone, copy);

                    //Don't bring in undefined values
                } else if (copy !== undefined) {
                    target[name] = copy;
                }
            }
        }
    }

    //Return the modified target
    return target;
}

Tools.isPlainObject = function (obj) {
    var proto, ctor;

    // function F(){}
    // toString.call(F)         "[object Function]"
    // toString.call(new F())   "[object Object]"
    // toString.call([])        "[object Array]"
    // toString.call("String")  "[object String]"
    // toString.call(11)        "[object Number]"
    // toString.call(true)      "[object Boolean]"
    // toString.call(null)      "[object Null]"
    // toString.call(undefined) "[object Undefined]"
    if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
    }

    proto = Object.getPrototypeOf(obj);

    //Objects with no [[Prototype]] (e.g.,`Object.create(null)`) are plain
    if (!proto) {
        return true;
    }

    //Objects with [[Prototype]] are plain if they were constructed by Object()
    ctor = Object.prototype.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof ctor === "function" && Function.toString.call(ctor) === Function.toString.call(Object);
}