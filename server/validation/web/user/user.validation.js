const Joi = require("joi");

module.exports =function userValidation(user) {
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        last_name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        role_id:Joi.number()
            .required(),
        nic: Joi.string()
            .trim()
            .required()
            .regex(new RegExp('^(?:19|20)?\d{2}[0-9]{10}|[0-9]{9}[x|X|v|V]$'),'not in valid format'),

        service_id: Joi.string()
            .required(),
        region:Joi.string(),
    });

    return schema.validate(user);
}