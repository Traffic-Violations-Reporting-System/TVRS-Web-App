const Joi = require("joi");

module.exports =function userRoleValidation(role) {
    const schema = Joi.object({
        role: Joi.string()
            .min(3)
            .max(10)
            .label("user role")
            .required(),
      
    });

    return schema.validate(role);
}