import React from 'react'

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
          <div className='w-[55%] h-[70%] border rounded-2xl shadow-md bg-[#ffffff] z-[100]'>

          </div>
        </div>
      </div>
    </>
    
  )
}
