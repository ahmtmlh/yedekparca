const hs = require('http-status');

const validate = (schema, source='body') => (req, res, next) => {
    schema.validateAsync(req[source])
        .then(value => {
            Object.assign(req, value)
            return next()
        })
        .catch(error => {
            const errorMessage = error?.details?.map(detail => detail?.message).join(', ').trim()
            return res.status(hs.BAD_REQUEST).send({error: errorMessage})
        })
};

module.exports = validate;