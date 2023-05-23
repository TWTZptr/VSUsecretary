import Joi from 'joi';

const schema = Joi.object({
  time: Joi.string().min(1).required().messages({
    'string.base': 'Время должно быть текстом',
    'string.empty': 'Время не должно быть пустым',
    'string.min': 'Время не должно быть пустым',
    'any.required': 'Время должно быть не пустым',
  }),
  audience: Joi.string().min(1).required().messages({
    'string.base': 'Номер аудитории должен быть текстом',
    'string.empty': 'Номер аудитории не должен быть пустым',
    'string.min': 'Номер аудитории не должен быть пустым',
    'any.required': 'Номер аудитории должен быть не пустым',
  }),
  directionId: Joi.number().required().messages({
    'number.base': 'Направление должно быть указано',
    'any.required': 'Направление должно быть указано',
  }),
});

export const validateEmailMessageData = (msgData) => {
  const validationResult = schema.validate(msgData);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
