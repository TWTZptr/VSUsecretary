import Joi from 'joi';

const schema = Joi.object({
  id: Joi.number(),
  theme: Joi.string().min(2).required().messages({
    'string.base': `Тема должна быть текстом`,
    'string.empty': `Тема должна быть не пустая`,
    'string.min': `Тема должна быть не короче 3 символов`,
    'any.required': `Тема не указана`,
  }),
  pagesNumber: Joi.number().required().messages({
    'number.base': `Количество страниц должно быть числом`,
    'any.required': `Количество страниц не указано`,
  }),
  originality: Joi.number().required().min(0).max(100).messages({
    'number.base': `Оригинальность должна быть числом`,
    'number.min': `Оригинальность должна быть не менее 0`,
    'number.max': `Оригинальность должна быть не более 100`,
    'any.required': `Оригинальность не указана`,
  }),
  supervisorMark: Joi.number().min(0).max(5).required().messages({
    'number.base': `Неверная оценка научного руководителя`,
    'number.min': `Оценка научного руководителя должна быть не менее 0`,
    'number.max': `Оценка научного руководителя должна быть не более 5`,
    'any.required': `Оценка научного руководителя не указана`,
  }),
  reviewerMark: Joi.number().allow('', null).min(0).max(5).messages({
    'number.base': `Оценка рецензента должна быть числом`,
    'number.min': `Оценка рецензента должна быть не менее 0`,
    'number.max': `Оценка рецензента должна быть не более 5`,
    'any.required': `Оценка рецензента не указана`,
  }),
  implementation: Joi.bool().required().messages({
    'bool.base': `Внедрение должна быть bool`,
    'any.required': `Внедрение не указана`,
  }),
  studentId: Joi.number().messages({
    'number.base': `Студент не указан`,
  }),
  reviewer: Joi.string().allow('').messages({
    'number.base': `Рецензент не указан`,
  }),
  supervisorId: Joi.number().messages({
    'number.base': `Научный руководитель не указан`,
  }),
  takeDayId: Joi.number().messages({
    'number.base': `День сдачи не указан`,
  }),
}).unknown(true);

export const validateDegreeWork = (degreeWork) => {
  const validationResult = schema.validate(degreeWork);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
