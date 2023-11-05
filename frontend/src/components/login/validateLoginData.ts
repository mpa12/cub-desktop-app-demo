interface LoginData {
  login?: string;
  password?: string;
}

interface ValidateLoginDataResponse {
  hasErrors: boolean;
  loginErrors: string[];
  passwordErrors: string[];
  generalErrors: string[];
}

const validateLoginData = (data: LoginData): ValidateLoginDataResponse => {
  const response: ValidateLoginDataResponse = {
    hasErrors: false,
    loginErrors: [],
    passwordErrors: [],
    generalErrors: [],
  };

  if (!data?.login) {
    response.hasErrors = true;
    response.loginErrors.push('Логин не может быть пустым');
  }

  if (!data?.password) {
    response.hasErrors = true;
    response.passwordErrors.push('Пароль не может быть пустым');
  }

  return response;
}

export default validateLoginData;
