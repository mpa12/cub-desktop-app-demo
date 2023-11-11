import {useState} from "react";

interface LoginErrors {
  loginErrors: string[];
  passwordErrors: string[];
  generalErrors: string[];
}

interface UseLoginState extends LoginErrors {
  login: string;
  password: string;
  rememberMe: boolean;
}

/**
 * State для данных формы авторизации.
 */
const useLoginState = () => {
  const defaultState: UseLoginState = {
    login: '',
    password: '',
    loginErrors: [],
    passwordErrors: [],
    generalErrors: [],
    rememberMe: true,
  };

  const [state, setState] = useState<UseLoginState>(defaultState);

  const setLogin = (newLogin: string) => {
    setState({
      ...state,
      login: newLogin,
    });
  };
  const setPassword = (newPassword: string) => {
    setState({
      ...state,
      password: newPassword,
    });
  };
  const setRememberMe = (rememberMe: boolean) => {
    setState({
      ...state,
      rememberMe,
    });
  };
  const setLoginErrors = (newLoginErrors: string[]) => {
    setState({
      ...state,
      loginErrors: newLoginErrors,
    });
  };
  const setPasswordErrors = (newPasswordErrors: string[]) => {
    setState({
      ...state,
      passwordErrors: newPasswordErrors,
    });
  };
  const setErrors = ({
    loginErrors,
    passwordErrors,
    generalErrors,
  }: LoginErrors) => {
    setState({
      ...state,
      loginErrors,
      passwordErrors,
      generalErrors,
    });
  };
  const setGeneralErrors = (generalErrors: string[]) => {
    setState({
      ...state,
      generalErrors,
    });
  };

  return {
    state,
    setState,
    setLogin,
    setPassword,
    setLoginErrors,
    setPasswordErrors,
    setErrors,
    setRememberMe,
    setGeneralErrors,
    ...state,
  };
};

export default useLoginState;
