import React from 'react'
import { HiOutlineUser, HiOutlineLockClosed } from 'react-icons/hi'
import { Link } from 'react-router-dom'
export const LoginPage = () => {
  const LoginPageImages = require.context('../../assets/', true)

  return (
    <>
      <div className='flex w-full h-screen relative'>
        <div className='h-fit w-full absolute top-0 left-0 z-[100]'><img src={LoginPageImages("./waves/wave_top_login.png")} alt="" className='h-full bg-cover w-full'/></div>
        <div className='h-fit w-full absolute bottom-0 left-0 z-[90]'><img src={LoginPageImages("./waves/wave_bottom_login.png")} alt="" className='h-full bg-cover w-full'/></div>
        <div className='w-[40%] h-full flex items-center relative'>
          <img src={LoginPageImages("./logos/MediKids_Colored-Logotype.png")} alt="" className='w-[60%] h-auto mx-auto'/>
          <div className='absolute right-0 h-[50%] w-[3px] bg-[#D8D7FE]'></div>
        </div>
        <div className='w-[60%] h-full flex items-center justify-center'>
          <form className='w-[55%] h-fit py-20 border rounded-2xl shadow-md bg-[#ffffff] z-[100] flex flex-col justify-center items-center gap-6'>
            <div className='flex flex-col justify-center items-center'>
              <img src={LoginPageImages('./icons/sign-in-icon.png')} alt="" className='h-[5rem]'/>
              <p className='text-[2rem] text-[#707070] mb-4'>Bienvenido</p>
              <p className='text-[#707070] m-0'>Ingrese sus credenciales para acceder</p>
            </div>
            <div className='bg-[#D8D7FE] h-[3rem] w-[70%] rounded-xl flex border-[3px] border-transparent focus-within:shadow-md focus-within:bg-white focus-within:border-[#a375ff] focus-within:border-[2px] hover:border-[2px] hover:border-[#a375ff] ease-in duration-100'>
              <div className='h-full w-[80%]'>
                <input type="text" placeholder='Usuario' className='h-full w-full bg-transparent outline-none px-6 placeholder:text-[#707070] text-[#707070]'/>
              </div>
              <div className='h-full w-[20%] flex items-center justify-center'>
                <HiOutlineUser className='text-[1.3rem] text-[#707070]'/>  
              </div>
            </div>
            <div className='bg-[#D8D7FE] h-[3rem] w-[70%] rounded-xl flex border-[3px] border-transparent focus-within:shadow-md focus-within:bg-white focus-within:border-[#a375ff] focus-within:border-[2px] hover:border-[2px] hover:border-[#a375ff] ease-in duration-100'>
              <div className='h-full w-[80%]'>
                <input type="password" placeholder='Contraseña' className='h-full w-full bg-transparent outline-none px-6 placeholder:text-[#707070] text-[#707070]'/>
              </div>
              <div className='h-full w-[20%] flex items-center justify-center'>
                <HiOutlineLockClosed className='text-[1.3rem] text-[#707070]'/>  
              </div>
            </div>
            <Link to={'/index'} className='flex items-center justify-center w-[70%] h-[2.8rem] bg-[#a375ff] text-[#FFFFFF] rounded-xl hover:bg-[#946ae9] ease-in duration-200 active:scale-[0.9]'>
              <p>Acceder</p>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
