const Joi = require('joi');
exports.signupSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});


exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


exports.eventSchema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(500).allow(''),
  date: Joi.date().iso().greater('now').required(),
  image: Joi.string().uri().allow('', null),
  location: Joi.string().max(100).allow(''),
  category: Joi.string().max(50).allow('')
});


exports.idSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

exports.eventQuerySchema = Joi.object({
  status: Joi.string().valid('upcoming', 'completed'),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1).max(100),
  search: Joi.string().max(100)
});
