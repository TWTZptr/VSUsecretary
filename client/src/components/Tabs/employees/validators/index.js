import Joi from 'joi';

const schema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(3).max(40).required().messages({
    'string.base': 'Имя должно быть текстом',
    'string.empty': 'Имя не должно быть пустым',
    'string.min': 'Имя не должно быть короче 3-х символов',
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
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email должен быть текстом',
      'string.empty': 'Email не должен быть пустым',
      'string.email': 'Email не соответствует формату',
    }),
  phoneNumber: Joi.string().min(4).max(20).messages({
    'string.base': 'Номер телефона должен быть текстом',
    'string.empty': 'Номер телефона не должен быть пустым',
    'string.min': 'Номер телефона не должен быть короче 4-х символов',
    'string.max': 'Номер телефона должен быть короче 20 символов',
  }),
});

export const validateEmployee = (employee) => {
  const validationResult = schema.validate(employee);
  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }
};
