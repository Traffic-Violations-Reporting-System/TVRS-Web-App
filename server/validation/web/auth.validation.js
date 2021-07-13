const Joi = require("joi");

function loginValidate(obj) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi.string()
            .required()
            .min(8),
    });

    return schema.validate(obj);
}


module.exports = loginValidate