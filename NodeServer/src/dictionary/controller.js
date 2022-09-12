const service = require('./service');
const request = require("request-promise");
const cheerio = require('cheerio');

const translateOxford = async (str) => {
    const word = str.trim().toLowerCase()
    const url = `https://www.oxfordlearnersdictionaries.com/search/english/?q=${word}`
    try {
        const body = await request(url)
        let $ = cheerio.load(body);  //loading of complete HTML body

        const words = []
        const ipas_us = []
        const ipas_uk = []
        const sounds_us = []
        const sounds_uk = []
        $('div.phons_br').each((_, e) => {
            words.push($(e).attr('wd'))
        })
        $('span.phonetics > div.phons_br > span.phon').each((_, e) => {
            ipas_us.push($(e).text())
        })
        $('span.phonetics > div.phons_n_am > span').each((_, e) => {
            ipas_uk.push($(e).text())
        })
        $('div.pron-uk.icon-audio').each((_, e) => {
            sounds_uk.push($(e).attr('data-src-mp3'))
        })

        $('div.pron-us.icon-audio').each((_, e) => {
            sounds_us.push($(e).attr('data-src-mp3'))
        })

        const trans_word_us = words.map((w, index) => {
            return {
                word: w,
                ipa: ipas_us[index],
                sound: sounds_us[index],
                locate: 'us'
            }
        })
        const trans_word_uk = words.map((w, index) => {
            return {
                word: w,
                ipa: ipas_uk[index],
                sound: sounds_uk[index],
                locate: 'uk'
            }
        })
        return [...trans_word_uk, ...trans_word_us]
    } catch (error) {
        console.error(error)
    }
}

const saveWords = async (props) => {
    const words = [...props]
    const trans_words_promises = words.map(async word => {
        return service.importWord(word)
    })

    await Promise.all(trans_words_promises)
}

module.exports = {

    async translate(req, res) {
        const word = req.query.word

        let result = await service.getWord(word)
        if (result.length == 0) {
            console.log("search ====>")
            result = await translateOxford(req.query.word)
            await saveWords(result)
        }
        res.status(201).send(result);
    },

    async create(req, res) {
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
            searchFields: ['word'],
            filterFields: ['locate'],
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
        const count = 64
        let idx = 1

        const results = [...Array(count).keys()].map(i => {
            return new Promise((resolve, reject) => {
                const option = { from: i, to: i + 1 };
                pdfUtil.pdfToText(req.file.path, option, function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }

                });
            })
        })
        const result = await Promise.all(results)
        res.status(201).send(result.filter(e => !!e));
    },
}