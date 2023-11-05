import React from "react";
import Input from "../components/ui/Input";
import cn from "classnames";
import logo from '../assets/logo.png';

const baseClassName = 'w-screen h-screen bg-purple flex flex-col items-center justify-center';
const wrapperClassName = 'max-w-[700px] w-full px-[40px] py-[20px] bg-white rounded-[20px] mx-[20px]';
const labelClassName = 'text-[25px] font-medium';
const lineClassName = 'mt-[23px] mb-[32px]';
const inputClassName = 'w-full h-[40px] px-[13px] border-[1px] mb-[20px]';
const buttonsGroupClassName = 'flex items-end justify-center gap-[20px] h-[100px]';
const buttonClassName = cn(
  'px-[30px] h-[40px] bg-purple flex items-center justify-center rounded-[20px] text-white',
  'hover:bg-purple-hover'
);
const topSectionClassName = 'h-[200px] flex items-center justify-center';
const imgClassName = 'w-[200px]';
const imgBgColor = '#8c599a';

/**
 * Страница авторизации.
 *
 * @constructor
 */
const Login = () => {
  return (
    <div className={baseClassName}>
      <section className={topSectionClassName}>
        <img src={logo} alt={'Логотип Эником Невада групп'} className={imgClassName} style={{
          filter: `drop-shadow(0 0 10px ${imgBgColor})`
        }} />
      </section>
      <section className={wrapperClassName}>
        <h3 className={labelClassName}>Авторизация</h3>
        <hr className={lineClassName} />
        <div>
          <Input type={'text'} className={inputClassName} placeholder={'Логин'} />
          <Input type={'text'} className={inputClassName} placeholder={'Пароль'} />
          <div>
            <input type={"checkbox"} id={'rememberMe'} className={'mr-[5px]'} />
            <label htmlFor={'rememberMe'} className={'select-none'}>Запомнить меня на этом компьютере</label>
          </div>
          <div className={buttonsGroupClassName}>
            <button className={buttonClassName}>Войти</button>
          </div>
        </div>
      </section>
      <section className={topSectionClassName} />
    </div>
  );
};

export default Login;
