var _=require('lodash'),
    uuid = require('node-uuid'),
    DbOptService = require('./DbOptService');

function MsgService() {}
MsgService.prototype = new DbOptService('../db/msg.json');


MsgService.prototype.find = function(condition) {
    var queryBody = condition.query,
        pageIdx = condition.paging.idx,
        quantity = condition.paging.quantity;

        /**filter and sorting begins */
    var msgs = this.read();
    if(queryBody){
        msgs = _.filter(msgs, queryBody);
    }

    msgs = _.orderBy(msgs, ['time'], ['desc']);
    /**filter and sorting ends */

    /**paging begins */
    var startIdx = (pageIdx - 1)*quantity,
        endIdx = startIdx + quantity;

    msgs = msgs.filter(function(msg, idx){
        return startIdx <= idx && idx <endIdx;
    });
    /**paging ends */

    return msgs;
};

MsgService.prototype.findById = function(id){
    return _.find(this.read(), {id: id}) || null;
};

MsgService.prototype.add = function(msgBody){
    var newMsg = Object.assign({
        id: uuid.v1().substr(0,8),
        time: Date.now()
    }, msgBody);

    var msgs = this.read() || [];
    msgs.push(newMsg);

    this.save(msgs);
    console.info('[INFO] Successfully added');
    return newMsg;
};

MsgService.prototype._auth = function(authBody){
    var targetMsg = this.findById(authBody.id);

    if(!targetMsg || targetMsg.author !== authBody.author){
        console.info('[WARN] Record not found or auth failed');
        return false;
    }

    return true;
}

MsgService.prototype.del = function(authBody){
    if(!this._auth(authBody)) return;
    this.save(_.reject(this.read(), {id: authBody.id}));
    console.info('[INFO] Successfully deleted');
    return true;
};

MsgService.prototype.mod = function(modMsgBody){
    if(!this.del(_.omit(modMsgBody, ['title', 'content']))){
        return;
    }

    var modMsg = this.add(modMsgBody);
    console.info('[INFO] Successfully modified');

    return modMsg;
};

module.exports = new MsgService();