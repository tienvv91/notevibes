const Store = require('./models')
const { NotFoundError, BadRequestError } = require('../error');


module.exports = {
    async getObject(id) {
        const cls = await Store.findById(id);
        if (!cls) {
            throw new NotFoundError(`Object does not exist id ${id}`);
        }
        return cls;
    },

    async create(body) {
        const {title, page} = body
        if(!(await Store.findOne({"title":title, "page": page}))){
            return Store.create(body);
        }
    },
    
    async update(id, body) {
        const cls = await this.getObject(id);
        Object.assign(cls, body);
        return cls.save();
    },

    async delete(id) {
        const cls = await this.getObject(id);
        await cls.delete();
    },

    async queryObjects(filter, options) {
        const stores = await Store.paginate(filter, options);
        return stores;
    },
}