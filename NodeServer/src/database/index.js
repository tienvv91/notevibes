const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const { db } = require('../config');

const customLabels = {
    totalDocs: 'docsCount',
    hasPrevPage: false,
    hasNextPage: false,
    pagingCounter: false,
    nextPage: false,
    prevPage: false,
};
paginate.paginate.options = {
    lean: { virtuals: true },
    leanWithId: false,
    customLabels,
};
aggregatePaginate.aggregatePaginate.options = { customLabels };

mongoose.plugin(paginate);
mongoose.plugin(aggregatePaginate);
mongoose.plugin(require('mongoose-lean-virtuals'));
mongoose.set('id', false);
mongoose.plugin(
    require('mongoose-delete'),
    {
        deletedBy: true,
        deletedByType: String,
        deletedAt: true,
        overrideMethods: true,
    },
);

module.exports = function connect(options = {}) {
    return mongoose.connect(db, options);
};
