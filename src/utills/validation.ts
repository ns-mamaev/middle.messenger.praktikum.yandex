export enum ValidationRules {
  NAME = 'name',
  LOGIN = 'login',
  EMAIL = 'email',
  PASSWORD = 'password',
  PHONE = 'phone',
  MESSAGE = 'message',
}

type CheckingResult = {
  result: boolean;
  message: string;
};

type CheckFunction = (value: string) => CheckingResult;

// name field regexp
const capitalLetterRegex = /^[A-Z]{1}|^[А-Я]{1}/;
const nameRegex = /^[A-Z]{1}[a-zA-Z-]{2,19}$|^[А-Я]{1}[Ёёа-яА-Я-]{2,19}$/;

// login field regexp
const onlyDigitsRegex = /^\d+$/;
const loginRegex = /[A-Za-z0-9_-]{3,20}$/;

// email field regexp
const allowedSymbolsEmailRegexp = /^[A-Za-z1-9@_\.-]+$/;
const emailRegexp = /^[a-z-_0-9\.]{2,}@[a-z_0-9]{2,}\.[a-z]{2,}$/;

// password regexp
const passwordRegex = /^.*\d+.*[A-ZА-ЯЁ].*$|^.*[A-ZА-ЯЁ].*\d.*$/;

// phone regexp
const phoneRegex = /^\+?\d{10,15}$/;

const createError = (message: string): CheckingResult => ({ result: false, message });

export const validateInput = (value: string, validationType: ValidationRules): CheckingResult => {
  if (value.length === 0) {
    return createError('вы пропустили поле');
  }
  switch (validationType) {
    case ValidationRules.NAME:
      return checkName(value);
    case ValidationRules.LOGIN:
      return checkLogin(value);
    case ValidationRules.EMAIL:
      return checkEmail(value);
    case ValidationRules.PASSWORD:
      return checkPassword(value);
    case ValidationRules.PHONE:
      return checkPhone(value);
    default:
      return { result: true, message: '' };
  }
};

const checkName: CheckFunction = (value) => {
  if (value.length < 3) {
    return createError(`минимальная длина поля 3 символа`);
  }
  if (!capitalLetterRegex.test(value)) {
    return createError('поле должно начинаться с заглавной буквы');
  }
  if (!nameRegex.test(value)) {
    return createError('допустимы только русские или латинские буквы и дефис');
  }
  return { result: true, message: '' };
};

const checkLogin: CheckFunction = (value) => {
  if (value.length < 3) {
    return createError(`минимальная длина логина 3 символа`);
  }
  if (value.length < 3) {
    return createError(`максимальная длина логина 20 символов`);
  }
  if (onlyDigitsRegex.test(value)) {
    return createError('логин не должен состоять только из цифр');
  }
  if (!loginRegex.test(value)) {
    return createError('допустимы только латинские буквы, цифры и символы - _');
  }
  return { result: true, message: '' };
};

const checkEmail: CheckFunction = (value) => {
  if (!value.includes('@')) {
    return createError('адрес должен содержать символ @');
  }
  if (!allowedSymbolsEmailRegexp.test(value)) {
    return createError('в адресе допустимы только латинские буквы, цифры и символы . _ - @');
  }
  if (!emailRegexp.test(value)) {
    return createError('введите адрес в формате user@server.com ');
  }
  return { result: true, message: '' };
};

const checkPassword: CheckFunction = (value) => {
  if (value.length < 8) {
    return createError(`минимальная длина пароля 8 символов`);
  }
  if (value.length > 20) {
    return createError(`максимальная длина пароля 40 символов`);
  }
  if (!passwordRegex.test(value)) {
    return createError('пароль должен содержать хотя бы 1 заглавную букву и цифру');
  }
  return { result: true, message: '' };
};

const checkPhone: CheckFunction = (value) => {
  const hasPlus = value.startsWith('+');
  if (value.length < (hasPlus ? 11 : 10)) {
    return createError(`минимальная длина номера 10 символов`);
  }
  if (value.length > (hasPlus ? 16 : 15)) {
    return createError(`максимальная длина номера 15 символов`);
  }
  if (!phoneRegex.test(value)) {
    return createError('номер может содержать только цифры и знак + в начале');
  }
  return { result: true, message: '' };
};
