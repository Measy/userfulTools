(function () {
    require('../../css/module/header.css');

    var headerModule = {
        config: {  //配置信息，header的class在多高时候触发fixed(class名)
            headerDom: $('.headerWrapper'),
            fixedTop: 80,
            fixedCls: 'header-fixed'
        },
        headerFixed: function(){  //切换class
            if($(window).scrollTop() > headerModule.config.fixedTop){
                headerModule.config.headerDom.addClass(headerModule.config.fixedCls);
            }else{
                headerModule.config.headerDom.removeClass(headerModule.config.fixedCls);
            }
        },
        init: function(){
            $(window).bind('scroll',function(){
                headerModule.headerFixed();
            });
        }
    };
    headerModule.init();
    module.exports = null;
})();