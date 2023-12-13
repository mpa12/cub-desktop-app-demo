import React, {useEffect} from "react";
import logo from "@assets/logo.png";
import cn from "classnames";
import { BarLoader } from "react-spinners";

const baseClassName = 'w-screen h-screen bg-green flex flex-col items-center justify-center';
const wrapperClassName = cn(
  'max-w-[700px] lg:w-full w-[90%] px-[20px] py-[20px] bg-white rounded-[20px] mx-[20px]',
  'flex flex-col items-center',
);
const imgClassName = 'h-[100px]';

const LoadingPage = () => {
  useEffect(() => {
    localStorage.setItem('firstSignIn', '1');
    setTimeout(() => {
      window.location.href = '/settings';
    }, 5000)
  }, []);

  return (
    <div className={baseClassName}>
      <section className={wrapperClassName}>
        <div className={'h-[300px] w-full flex items-center justify-center'}>
          <img src={logo} alt={'Логотип Невада групп'} className={imgClassName} />
        </div>
        <div className={'w-full'}>
          <BarLoader color={'#1c9a47'} height={7} cssOverride={{
            borderRadius: 10,
            height: 7,
            width: '100%'
          }} />
        </div>
        <div className={'h-[35px] flex items-end text-[14px]'}>
          <h3>Авторизация</h3>
        </div>
      </section>
    </div>
  );
};

export default LoadingPage;
