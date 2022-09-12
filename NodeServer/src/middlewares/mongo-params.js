/*
 Prepare parameters for mongo-paginate from req.query
 */
 module.exports = function (req, res, next) {
    const { query } = req;
    req.mongoParams = function (opts = {}) {
        const {
            defaultSort = '',
            filterFields = [],
            searchFields = [],
        } = opts;
        const filter = {};
        filterFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(query, field)) {
                const qry = query[field];
                if (qry instanceof Array) {
                    filter[field] = { $in: qry };
                } else if (qry instanceof String || typeof qry === 'string') {
                    filter[field] = qry;
                }
            }
        });
        searchFields.forEach((field) => {
            if (Object.prototype.hasOwnProperty.call(query, field)) {
                // eslint-disable-next-line security/detect-non-literal-regexp
                filter[field] = new RegExp(query[field], 'i');
            }
        });
        const options = {
            sort: query.sort ?? defaultSort,
            populate: query.populate,
            select: query.select,
        };
        if (query.limit === 'all') {
            options.pagination = false;
        } else {
            options.limit = query.limit ?? 10;
            options.page = query.page ?? 1;
        }
        return [
            filter,
            options,
        ];
    };
    next();
};
