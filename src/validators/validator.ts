import Joi from "joi";


export const weatherBitsEntryValidation = Joi.object({
    units: Joi.string().valid('S', 'I', 'M'),
    cityId: Joi.number().required(),
    language: Joi.string().valid('en', 'ro')
});

export const cityValidator = Joi.object({
    cityId: Joi.number().required()
});

export const weatherValidator = Joi.object({
    cityId: Joi.number().required(),
    temperature: Joi.number().required,
    date: Joi.number().required()
});
export const statisticsValidator = Joi.object({
    cityId: Joi.number().required(),
    temperature: Joi.number().required,
    date: Joi.number().required()
});