const gTTS = require('gtts');
const translate = require('translate-google')

module.exports = {
    async getTextToSpeech(req, res) {
        var gtts = new gTTS('text to speak', 'en');
        gtts.save('hello.mp3', function (err, result) {
            if (err) { throw new Error(err) }
            console.log('Success! Open file /tmp/hello.mp3 to hear result.');
            res.status(201).send("Success! Open file /tmp/hello.mp3 to hear result.");
        });
    },

    async textToSpeech(req, res) {
        res.status(201).send("Hello");
    },
    
    async translate(req, res) {
        let { lang_from, lang_to, text } = req.body
        console.log(req.body, text)
        translate(text, { from: lang_from, to: lang_to }).then(ress => {
            console.log(ress)
            res.status(201).send(ress);
        }).catch(err => {
            console.error(err)
        })
    }
}