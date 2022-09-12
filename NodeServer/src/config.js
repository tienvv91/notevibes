const dotenv = require('dotenv');
const path = require('path');

const Joi = require('joi');

const string = Joi.string().required();
const number = Joi.number().required();
const object = Joi.object().required();


dotenv.config({ path: path.join(__dirname, '../.env') });

const schema = object
    .keys({
        NODE_ENV: string.valid('development', 'production', 'test'),
        HOST: string.hostname().description('Hostname to listen on'),
        PORT: number.description('Port to listen on'),
        DATABASE_URL: string.uri().description('Database URL'),
        API_PREFIX: string.description('API Prefix'),
    })
    .unknown(true);

const { value, warning, error } = schema.validate(process.env, {
    abortEarly: false,
});

if (warning) {
    // eslint-disable-next-line no-console
    console.warn(warning);
}
if (error) {
    throw new Error(`Validation for .env config failed: ${error.message}`);
}

module.exports = {
    inDevelopment: value.NODE_ENV === 'development',
    inProduction: value.NODE_ENV === 'production',
    env: value.NODE_ENV,
    host: value.HOST,
    port: value.PORT,
    apiPrefix: value.API_PREFIX,
    db: value.DATABASE_URL,
};