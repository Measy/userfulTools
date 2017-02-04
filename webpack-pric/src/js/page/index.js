(function () {
    //引入公共CSS与页面CSS
    require('../../css/vendor/reset.css');
    require('../../css/page/index.css');

    //引入并创建多个独立的slideModule模块
    var slideModule = require('../module/slide.js');
    new slideModule({dom:$('[node-type="iccAdvisorPicture"]')});
    new slideModule({
        dom: $('[node-type="iccAdvisorPicture2"]'),
        delay: 4000,
        duration: 800
    });
    new slideModule({
        dom: $('[node-type="iccAdvisorPicture2"]'),
        delay: 3500,
        duration: 1000
    });

    //添加对话框事件
    var pageDialog = false;
    $('.pictureShow a').click(function(){
        var _id = $(this).attr('dialog-for');
        require.ensure(["../module/dialog.js", "../module/dialogConfig.js"], function(require){
            var dialogModule = require("../module/dialog.js");
            var dialogConfig = require("../module/dialogConfig.js");
            if(!pageDialog){
                pageDialog = new dialogModule();
            }
            pageDialog.openDialogWith(dialogConfig[_id]);
        });
    });
})();