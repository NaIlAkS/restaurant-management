const Joi = require('joi');

// Schema for user registration
const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'staff', 'customer').required()
});

module.exports = { registerSchema };
