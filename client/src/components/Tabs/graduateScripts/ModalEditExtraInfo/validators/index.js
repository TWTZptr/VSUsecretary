import Joi from 'joi';

const schema = Joi.object({
  employeeId: Joi.number(),
  graduateScriptId: Joi.number(),
  position: Joi.string().allow('').min(3).messages({
    'string.base': 'Должность должна быть текстом',
    'string.empty': 'Должность не должна быть пустой',
    'string.min': 'Должностьне должна быть короче 3-х символов',
    'any.required': 'Должность должна быть не пустым',
  }),
  anotherJob: Joi.string().allow('').min(3).max(50).messages({
    'string.base': 'Второе место работы должно быть текстом',
    'string.empty': 'Второе место работы не должно быть пустым',
    'string.min': 'Второе место работы не должно быть короче 3-х символов',
    'string.max': 'Второе место работы должно быть короче 50 символов',
  }),
  academicDegree: Joi.string().allow('').messages({
    'any.required':
      'Внутренняя ошибка. Попробуйте обновить страницу и попробовать снова',
    'string.base':
      'Внутренняя ошибка. Попробуйте обновить страницу и попробовать снова',
    'string.empty': 'Ученое звание не указано',
  }),
  academicRank: Joi.string().allow('').optional().messages({
    'any.required':
      'Внутренняя ошибка. Попробуйте обновить страницу и попробовать снова',
    'string.base':
      'Внутренняя ошибка. Попробуйте обновить страницу и попробовать снова',
    'string.empty': 'Ученая степень не указана',
  }),
  role: Joi.string(),
  index: Joi.number(),
}).unknown(true);

export const validateExtraInfo = (extraInfo) => {
  const validationResult = schema.validate(extraInfo);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
