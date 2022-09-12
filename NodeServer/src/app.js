const express = require('express');
const cors = require('cors');
const { host, port } = require('./config');
const database = require('./database');
const { apiPrefix, inDevelopment } = require('./config');

const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('compression')());
app.use(require('express-mongo-sanitize')());
app.use(require('xss-clean')());

app.use(cors());

// NOTE Use fake user until we implement proper authentication
app.use(function (req, res, next) {
    req.user = {
        account: 'admin',
    };
    next();
});

app.use('/static', express.static(path.join(__dirname, '../static')));
app.use(require('./middlewares/mongo-params'));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(apiPrefix, require('./routes'));

let server = app.listen(port, host, () => {
    database()
        .then((db) => {
            console.log(
                `Sucessfully connected to database at ${db.connection._connectionString}`,
            );
        })
        .catch((err) => {
            console.error({ label: 'Database', message: err.message });
        });
    console.log(`Listening to requests on ${host}:${port}`);
});


process.on('SIGTERM', () => {
    console.error('SIGTERM received. Exiting...');
    if (server) {
        server.close();
    }
});