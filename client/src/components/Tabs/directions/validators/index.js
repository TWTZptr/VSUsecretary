import Joi from 'joi';

const schema = Joi.object({
  id: Joi.number(),
  code: Joi.string()
    .required()
    .pattern(new RegExp('^\\d\\d.\\d\\d.\\d\\d$'))
    .messages({
      'string.base': `Код должен быть строкой`,
      'string.empty': `Код направления не указан`,
      'string.pattern.base': `Код не соответствует виду xx.xx.xx`,
    }),
  shortName: Joi.string().required().messages({
    'string.base': `Короткое название должно быть строкой`,
    'string.empty': `Короткое название не указано`,
  }),
  fullName: Joi.string().required().messages({
    'string.base': `Полное название должно быть строкой`,
    'string.empty': `Полное название не указано`,
  }),
  educationLevelId: Joi.number().required().messages({
    'number.base': `Неверная степень обучения`,
    'number.empty': 'Степень обучения не указана',
  }),
}).unknown(true);

export const validateDirection = (direction) => {
  const validationResult = schema.validate(direction);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
