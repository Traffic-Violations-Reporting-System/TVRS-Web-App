const Joi = require("joi");

module.exports = function validate(user) {
    const schema = Joi.object({
        nic: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        contactNo: Joi.string()
            .required()
            .min(8),
    });

    return schema.validate(user);
}