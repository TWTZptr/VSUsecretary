import Joi from 'joi';

const schema = Joi.object({
  id: Joi.number(),
  number: Joi.number().min(1).required().messages({
    'number.base': `Номер группы должен быть числом`,
    'number.min': `Номер группы должен быть больше 0`,
    'any.required': `Номер группы не указан`,
  }),
  educationLevel: Joi.string().required().messages({
    'string.base': `Внутренняя ошибка. Попробуйте обновить страницу и попробовать снова`,
  }),
  directionId: Joi.number().messages({
    'number.base': `Направление не указано`,
  }),
});

export const validateGroup = (group) => {
  const validationResult = schema.validate(group);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
