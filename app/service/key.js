'use strict';

const Service = require('egg').Service;

class KeyService extends Service {
  getKeyType(keytype) {
    if (keytype === 'sm2') {
      return {
        model: 'Sm2key',
        addAction: 'insertsm2',
        delAction: 'delsm2',
      };
    } else if (keytype === 'sm1' || keytype === 'sm4') {
      return {
        model: 'Sm1sm4key',
        addAction: 'insert',
        delAction: 'del',
      };
    }

    this.ctx.throw(433, '参数错误，密钥类型不存在');
  }

  async create(params) {
    const { ctx } = this;
    const { keyindex, keytype, keylen } = params;
    const { model, addAction } = this.getKeyType(keytype);

    const object = await ctx.configModel[model].findOne({
      where: {
        keyindex,
      },
    });

    if (object) {
      ctx.throw(433, `密钥索引 ${keyindex} 已存在，请换一个重试`);
    }

    if (addAction === 'insert' && !keylen) {
      ctx.throw(433, '缺少参数 keylen');
    }

    const cmd = 'keymng';
    const args = [addAction, keyindex, keytype];
    addAction === 'insert' && args.push(keylen);
    return ctx.service.base.execSync(cmd, args);
  }

  async query(query) {
    const { ctx } = this;
    const where = {};
    const { keyindex, keytype } = query;
    where.keytype = keytype;
    query.keyindex && (where.keyindex = keyindex);
    const { model } = this.getKeyType(keytype);

    const attrs = ['keyindex', 'keytype'];
    const pageParams = {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
    };

    return await ctx.service.base.page(
      where,
      pageParams,
      model,
      attrs,
      'configModel'
    );
  }

  async del(id, keytype) {
    const { ctx } = this;
    if (!id) {
      ctx.throw(433, '参数错误：缺少密钥索引参数');
    }
    const { model, delAction } = this.getKeyType(keytype);

    const object = await ctx.configModel[model].findOne({
      where: {
        keyindex: id,
      },
    });

    if (!object) {
      ctx.throw(433, '操作的数据不存在');
    }

    const result = ctx.service.base.execSync('keymng', [delAction, id]);
    if (!result.error) {
      return await object.destroy();
    }
  }
}

module.exports = KeyService;
