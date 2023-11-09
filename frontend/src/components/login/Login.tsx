import React, { useState } from "react";
import Input from "../ui/Input";
import cn from "classnames";
import logo from '../../assets/logo.png';
import useLoginState from "./useLoginState";
import validateLoginData from "./validateLoginData";
import authStore from "../../stores/AuthStore";
import { useNavigate } from "react-router-dom";

const baseClassName = 'w-screen h-screen bg-green flex flex-col items-center justify-center';
const wrapperClassName = 'max-w-[700px] w-full px-[40px] py-[20px] bg-white rounded-[20px] mx-[20px]';
const labelClassName = 'text-[25px] font-medium';
const lineClassName = 'mt-[23px] mb-[32px] text-dark-gray';
const inputClassName = 'w-full h-[40px] px-[13px] border-[1px]';
const buttonsGroupClassName = 'flex items-end justify-center gap-[20px] h-[100px]';
const buttonClassName = cn(
  'px-[30px] h-[40px] bg-green flex items-center justify-center rounded-[20px] text-white',
  'hover:bg-green-hover'
);
const topSectionClassName = 'h-[200px] flex items-center justify-center';
const imgClassName = 'w-[200px]';
const imgBgColor = '#2cbb5d';
const errorsWrapperClassName = 'mb-[20px]';
const errorClassName = 'text-red text-[13px] leading-[11px]';
const generalErrorsWrapperClassName = 'flex flex-col items-center';

/**
 * Страница авторизации.
 *
 * @constructor
 */
const Login = () => {
  const {
    login,
    password,
    rememberMe,
    setLogin,
    setPassword,
    loginErrors,
    passwordErrors,
    generalErrors,
    setErrors,
    setLoginErrors,
    setPasswordErrors,
    setRememberMe,
    setGeneralErrors,
  } = useLoginState();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setIsLoading(true);

    const loginData = {
      login,
      password
    };

    const errors = validateLoginData(loginData);

    if (errors.hasErrors) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }

    await authStore.login(login, password);

    if (authStore.isAuth) {
      setErrors({
        generalErrors: [''],
        loginErrors: [''],
        passwordErrors: [''],
      });
      setIsLoading(false);
      navigate('/');
      return;
    }

    setErrors({
      generalErrors: ['Неверный логин или пароль'],
      loginErrors: [''],
      passwordErrors: [''],
    });

    setIsLoading(false);
  }

  return (
    <div className={baseClassName}>
      <section className={topSectionClassName}>
        <img src={logo} alt={'Логотип Невада групп'} className={imgClassName} style={{
          filter: `drop-shadow(0 0 10px ${imgBgColor})`
        }} />
      </section>
      <section className={wrapperClassName}>
        <h3 className={labelClassName}>Авторизация</h3>
        <hr className={lineClassName} />
        <div>
          <Input
            type={'text'}
            className={cn(inputClassName, {
              ['border-red focus:border-red']: !!loginErrors.length
            })}
            placeholder={'Логин'}
            value={login}
            onChange={(evt) => {
              if (loginErrors.length) {
                setTimeout(() => setLoginErrors([]));
              }
              if (generalErrors.length) {
                setTimeout(() => setGeneralErrors([]));
              }
              setLogin(evt.target.value);
            }}
            name={'login'}
          />
          <div className={errorsWrapperClassName} key={'loginErrors'}>
            {loginErrors.map((loginError, index) => {
              return (
                <div key={`${index}-loginError`}>
                  <span className={errorClassName}>{loginError}</span>
                </div>
              )
            })}
          </div>
          <Input
            type={'password'}
            className={cn(inputClassName, {
              ['border-red focus:border-red']: !!passwordErrors.length
            })}
            placeholder={'Пароль'}
            value={password}
            onChange={(evt) => {
              if (passwordErrors.length) {
                setTimeout(() => setPasswordErrors([]));
              }
              if (generalErrors.length) {
                setTimeout(() => setGeneralErrors([]));
              }
              setPassword(evt.target.value);
            }}
            name={'password'}
          />
          <div className={errorsWrapperClassName} key={'passwordErrors'}>
            {passwordErrors.map((passwordError, index) => {
              return (
                <div key={`${index}-passwordError`}>
                  <span className={errorClassName}>{passwordError}</span>
                </div>
              )
            })}
          </div>
          <div>
            <input
              type={"checkbox"}
              id={'rememberMe'}
              className={'mr-[5px]'}
              checked={rememberMe}
              onChange={(evt) => setRememberMe(evt.target.checked)}
            />
            <label
              htmlFor={'rememberMe'}
              className={'select-none'}
            >Запомнить меня на этом компьютере</label>
          </div>
          <div className={generalErrorsWrapperClassName} key={'generalErrors'}>
            {generalErrors.map((generalError, index) => {
              return (
                <div key={`${index}-generalError`}>
                  <span className={errorClassName}>{generalError}</span>
                </div>
              )
            })}
          </div>
          <div className={buttonsGroupClassName}>
            <button className={buttonClassName} onClick={onLogin}>{
              isLoading ? 'Загрузка...' : 'Войти'
            }</button>
          </div>
        </div>
      </section>
      <section className={topSectionClassName} />
    </div>
  );
};

export default Login;
