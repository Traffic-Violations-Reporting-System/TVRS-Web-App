const Joi = require("joi");

module.exports =function userValidation(user) {
    const schema = Joi.object({
        first_name: Joi.string()
            .min(3)
            .max(50)
            .label("First name")
            .required(),
        last_name: Joi.string()
            .min(3)
            .max(50)
            .label("Last name")
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .label("Email")
            .required(),
        role_id:Joi.number()
            .label("user role")
            .required(),

    });

    return schema.validate(user);
}