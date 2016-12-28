/**
 * Cteate a callback list using the following parameters:
 * 
 *  options: an optional list of space-seperated options that will change how
 *          the callback list behaves or a more traditional option object
 */
Callbacks = function (options) {
    //Convert options from String-formatted to Object-formatted if needed
    options = typeof options === "string" ? createOptions(options) : Tools.extend({}, options);

    var firing, //Flag to know if list is currently firing
        memory, //Last fire value for non-forgettable lists
        fired, //Flag to know if list was already fired
        locked, //Flag to prevent firing
        list = [], //Actual callback list
        queue = [], //Queue of execution data for repeatable list
        firingIndex = -1, //Index of currently firing callback(modified by add/remove as needed)

        fire = function () {
            //Enforce single-firing
            locked = options.once;
            //Execute callbacks for all pending executions,
            //respecting firingIndex overrides and runtime changes
            fired = firing = true;
            for (; queue.length; firingIndex = -1) {
                memory = queue.shift();
                while (++firingIndex < list.length) {
                    //Run callback and check for early termination
                    if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                        options.stopOnFalse) {
                        //Jump to end and forget the data so .add doesn't re-fire
                        firingIndex = list.length;
                        memory = false;
                    }
                }
            }
            //Forget the data if we're done with item
            if (!options.memory) {
                memory = false;
            }
            firing = false;
            //clean up if we're done with item
            if (locked) {
                //keep an empty list if we have data for future add calls
                if (memory) {
                    list = [];
                    //otherwise,this object is spent
                } else {
                    list = "";
                }
            }
        },

        //actual Callbacks object
        self = {
            //add a callback or collection of callbacks to the list
            add: function () {
                if (list) {
                    //if we have memory from a past run,we should fire after adding
                    if (memory && !firing) {
                        firingIndex = list.length - 1;
                        queue.push(memory);
                    }

                    (function add(args) {
                        Tools.each(args, function (index, arg) {
                            if (Tools.type(arg) === "function") {
                                if (!options.unique || !self.has(arg)) {
                                    list.push(arg);
                                }
                            } else if (Tools.isArrayLike(arg) && Tools.type(arg) !== "string") {
                                add(arg);
                            }
                        });
                    })(arguments);

                    if (memory && !firing) {
                        fire();
                    }
                }
                return this;
            },

            remove: function () {
                if(!list) return;
                Tools.each(arguments, function (index, arg) {
                    if (Tools.type(arg) === "function") {
                        while ((index = Array.prototype.indexOf.call(arg, list)) > -1) {
                            list.split(index, 1);
                            //Hande firing indexs
                            if (index <= firingIndex) {//等于的时候触发可能会照成上一个事件被调用两次
                                firingIndex--;
                            }
                        }
                    } else if (Tools.isArrayLike(arg)) {
                        remove(arg);
                    }
                });
                return this;
            },

            //Check if a given callback is in the list
            //if no argument is given,return whether or not list has callbacks attached
            has: function(elem){
                if(!list) return;
                return fn? 
                    Array.prototype.indexOf.call(list,elem) > -1:
                    true;
            },

            //Remove all callbacks from the list
            empty: function(){
                if(list){
                    list = [];
                }
                return list;
            },

            //Disable .fire and .add
            //Abort any current.pending executions
            //Clear all callbacks and valuesd
            disable: function(){
                locked = queue = [];
                list = memory = "";
                return this;
            },
            disabled: function(){
                return !list;
            },

            //diasble .fire
            //also disable .add unless we have memory
            //abort any pending executions
            lock: function(){
                locked = queue = [];
                if(list){
                    firingIndex = list.length;
                }
                return this;
            },
            locked: function(){
                return !!locked;
            },

            //call all callbacks with the given context and arguments
            fireWith: function(context, args){
                if(!locked){
                    args = args || [];
                    args = [context, args.slice? args.slice():args];
                    queue.push(args);
                    if(!firing){
                        fire();
                    }
                }
                return this;
            },

            //call all the callbacks with the given arguments
            fire: function(){
                self.fireWith(this, arguments);
                return this;
            },

            //to know if the callbacks have already been called at least once
            fired: function(){
                return !!fired;
            }
        };

        return self;
};


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

class2type = {};
(function () {
    var types = "Boolean Number String Function Array Date RegExp Object Error Symbol Arguments";
    types.split(" ").forEach(function (value, index) {
        class2type["[object " + value + "]"] = value.toLowerCase();
    })
})();

Tools = {};

/**
 * 判断是否是数组或者类数组对象
 */
Tools.isArrayLike = function(obj) {
    var type = Tools.type(obj);
    if (type === "array" || type == "string" || type === "arguments") {
        return true;
    } else if (type !== "object") {
        return false;
    } else {
        return "length" in obj && obj.length == 0 || obj.length > 0 && (obj.length - 1) in obj;
    }

}

/**
 * customer .each() for object or array
 * @param {Object|Array} an object or array to iterate
 * @param {Function(index,element)} callback function in iterate;index & element will pass in
 * @returns {Object|Array} the obj which every item run in callback 
 */
Tools.each = function(obj, callback) {
    var length, i = 0;

    if (Tools.isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
            //用callback的返回值做循环控制，来提前结束each
            var test = obj[i];
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    } else {
        for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
                break;
            }
        }
    }

    return obj;
}

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

Tools.type = function (obj) {
    return class2type[toString.call(obj)];
}