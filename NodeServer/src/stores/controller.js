const service = require('./service');
var pdfUtil = require('pdf-to-text');
var pdf_path = "C:\\Users\\Admin\\Downloads\\TheLittlePrince.pdf";
var option = { from: 0, to: 10 };

// //Omit option to extract all text from the pdf file
// pdfUtil.pdfToText(pdf_path, function(err, data) {
//     if (err) throw(err);
//     console.log(data); //print all text    
//   });

module.exports = {
    async create(req, res) {
        // pdfUtil.info(pdf_path, function (err, info) {
        //     if (err) throw (err);
        //     console.log(info);
        // });
        // res.status(201).send(await service.create(req.body));
        res.status(201).send("Not supported yet!");
    },
    async getObject(req, res) {
        res.send(await service.getObject(req.params.id));
    },

    async update(req, res) {
        res.send(await service.update(req.params.id, req.body));
    },

    async deleteObject(req, res) {
        await service.delete(req.params.id, req.user.account);
        res.sendStatus(204);
    },

    async queryClasses(req, res) {
        const opts = {
            searchFields: ['title'],
            filterFields: ['author', 'genre'],
        };
        const [filter, options] = req.mongoParams(opts);
        if (options.sort === '') {
            options.sort = '-createdAt';
        }
        const { startDate, endDate } = req.query;
        if (startDate || endDate) {
            if (startDate && endDate) {
                filter.$nor = [
                    // class ends before startDate
                    { startDate: { $gt: new Date(endDate) } },
                    // class starts after endDate
                    { endDate: { $lt: new Date(startDate) } },
                ];
            } else if (startDate) {
                filter.endDate = { $gte: new Date(startDate) };
            } else if (endDate) {
                filter.startDate = { $lte: new Date(endDate) };
            }
        }
        res.send(await service.queryObjects(filter, options));
    },
    async importFromExcel(req, res) {
        const path = req.file.path
        const count = Number(req.body.total)
        let idx = 1

        const results = [...Array(count).keys()].map(i => {
            const option = { from: i, to: i + 1 };
            return new Promise((resolve, reject) => {
                pdfUtil.pdfToText(req.file.path, option, async function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        const body = {
                            title: req.body.title,
                            author: req.body.author,
                            genre: req.body.genre,
                            description: req.body.description,
                            content: data,
                            page: i,
                            total: count
                        }
                        resolve(await service.create(body))
                    }

                });
            })
        })
        const result = await Promise.all(results)
        res.status(201).send(result.filter(e => !!e));
    },
}