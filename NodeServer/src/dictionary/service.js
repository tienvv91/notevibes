const DictionaryStore = require('./models')
const { NotFoundError, BadRequestError } = require('../error');


module.exports = {

    async getWord(word) {
        return DictionaryStore.find({'word':word})
    },

    async getObject(id) {
        const cls = await DictionaryStore.findById(id);
        if (!cls) {
            throw new NotFoundError(`Object does not exist id ${id}`);
        }
        return cls;
    },

    async importWord(body) {
        const { word, locate } = body

        if(!(await DictionaryStore.findOne({word, locate}))){
            // throw new BadRequestError(`${word} already exists.`);
            return DictionaryStore.create(body);
        }
    },

    async create(body) {
        const { word, locate } = body
        if(await DictionaryStore.findOne({word, locate})){
            throw new BadRequestError(`${word} already exists.`);
        }
        return DictionaryStore.create(body);
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
        const DictionaryStores = await DictionaryStore.paginate(filter, options);
        return DictionaryStores;
    },
}