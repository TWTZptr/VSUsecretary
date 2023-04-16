import Joi from 'joi';

const schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(2).max(40).required().messages({
    'string.base': 'Имя должно быть текстом',
    'string.empty': 'Имя не должно быть пустым',
    'string.min': 'Имя не должно быть короче 2-х символов',
    'string.max': 'Имя должно быть короче 40 символов',
    'any.required': 'Имя должно быть не пустым',
  }),
  lastname: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Фамилия должна быть текстом',
    'string.empty': 'Фамилия не должна быть пустым',
    'string.min': 'Фамилия не должна быть короче 3-х символов',
    'string.max': 'Фамилия должна быть короче 50 символов',
    'any.required': 'Фамилия должно быть не пустым',
  }),
  patronymic: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Отчество должно быть текстом',
    'string.empty': 'Отчество не должно быть пустым',
    'string.min': 'Отчество не должно быть короче 3-х символов',
    'string.max': 'Отчество должно быть короче 50 символов',
    'any.required': 'Отчество должно быть не пустым',
  }),
  publications: Joi.number().min(0).required().messages({
    'number.base': 'Количество публикаций должно быть числом',
    'number.empty': 'Количество публикаций не должно быть пустым',
    'number.min': 'Количество публикаций не могут быть отрицательным',
  }),
  year: Joi.number().optional(),
  directionId: Joi.number().optional().messages({
    'number.empty': 'Направление не указано',
  }),
  order: Joi.optional(),
  degreeWorkId: Joi.optional(),
  graduateScriptId: Joi.optional(),
});

export const validateStudent = (student) => {
  const validationResult = schema.validate(student);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
