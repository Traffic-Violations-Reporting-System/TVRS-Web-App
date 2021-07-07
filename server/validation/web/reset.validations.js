const Joi = require("joi");

function forgotValidate(obj) {
   const schema = Joi.object({
       email: Joi.string()
           .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
           .required(),
   });

   return schema.validate(obj);
}

function setValidate(obj) {
   const schema = Joi.object({
       newpassword: Joi.string()
       .required()
       .min(8),
       confirmpassword: Joi.string()
           .required()
           .min(8)
           .valid(Joi.ref('newpassword')),
   });

   return schema.validate(obj);
}

module.exports = { forgotValidate, setValidate };