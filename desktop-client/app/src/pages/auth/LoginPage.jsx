import React, { useState, useEffect } from "react";
import { HiOutlineUser, HiOutlineLockClosed } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { VscLoading } from "react-icons/vsc";
import BeatLoader  from "react-spinners/BeatLoader";
import { useAuth } from "../../context/AuthContext";
import '../../assets/scss/Globals.scss'

export const LoginPage = () => {
  let navigate = useNavigate();
  const {
    DoctorLogin,
    Error,
    setError,
    Success,
    setSuccess,
    Chargin,
    setChargin,
  } = useAuth();

  const [ShowLoading, setShowLoading] = useState(false);
  const [Label, setLabel] = useState("Acceder");
  const [User, setUser] = useState("");
  const [Password, setPassword] = useState("");

  useEffect(() => {
    if (Chargin) {
      setTimeout(() => {
        setError("");
        setSuccess("");
        setChargin(false);
      }, 4000);
    }
  }, [Chargin]);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const data = await DoctorLogin(User, Password);

      if (data) {
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            id: data.data.User.id,
            User: data.data.User.User,
            jwtToken: data.data.token,
          })
        );
        setChargin(true);
        setError("");
        setTimeout(() => {
          setSuccess("Sesión iniciada correctamente");
          setLabel("✓ Completado");
          setTimeout(() => {
            setShowLoading(true);
            setTimeout(() => {
              navigate("/index");
            }, 3000);
          }, 2000);
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const LoginPageImages = require.context("../../assets/", true);

  return (
    <>
      <div className="relative flex w-full h-screen">
        <div className="h-fit w-full absolute top-0 left-0 z-[100]">
          <img
            src={LoginPageImages("./waves/wave_top_login.png")}
            alt=""
            className="w-full h-full bg-cover"
          />
        </div>
        <div className="h-fit w-full absolute bottom-0 left-0 z-[90]">
          <img
            src={LoginPageImages("./waves/wave_bottom_login.png")}
            alt=""
            className="w-full h-full bg-cover"
          />
        </div>
        <div className="w-[40%] h-full flex items-center relative">
          <img
            src={LoginPageImages("./logos/MediKids_Colored-Logotype.png")}
            alt=""
            className="w-[60%] h-auto mx-auto"
          />
          <div className="absolute right-0 h-[50%] w-[3px] bg-[#D8D7FE]"></div>
        </div>
        <div className="w-[60%] h-full flex items-center justify-center">
          <form
            onSubmit={handleForm}
            className="w-[55%] h-fit py-20 border rounded-2xl shadow-md bg-[#ffffff] z-[100] flex flex-col justify-center items-center gap-6"
          >
            <div className="flex flex-col items-center justify-center">
              <img
                src={LoginPageImages("./icons/sign-in-icon.png")}
                alt=""
                className="h-[5rem]"
              />
              <p className="text-[2rem] text-[#707070] mb-4">Bienvenido</p>
              <p className="text-[#707070] m-0">
                Ingrese sus credenciales para acceder
              </p>
            </div>
            <div className="h-[0.7rem] w-fit">
              {Error && (
                <span className="ball-description-error messages-login text-red-500 italic">
                  {Error}
                </span>
              )}
              {Success && (
                <span className="ball-description-complete messages-login text-green-500 italic">
                  {Success}
                </span>
              )}
            </div>
            <div className="bg-[#D8D7FE] h-[3rem] w-[70%] rounded-xl flex border-[3px] border-transparent focus-within:shadow-md focus-within:bg-white focus-within:border-[#a375ff] focus-within:border-[2px] hover:border-[2px] hover:border-[#a375ff] ease-in duration-100 overflow-hidden">
              <div className="h-full w-[80%]">
                <input
                  type="text"
                  placeholder="Usuario"
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={User}
                  className="h-full w-full bg-transparent outline-none px-6 placeholder:text-[#707070] text-[#707070]"
                />
              </div>
              <div className="h-full w-[20%] flex items-center justify-center">
                <HiOutlineUser className="text-[1.3rem] text-[#707070]" />
              </div>
            </div>
            <div className="bg-[#D8D7FE] h-[3rem] w-[70%] rounded-xl flex border-[3px] border-transparent focus-within:shadow-md focus-within:bg-white focus-within:border-[#a375ff] focus-within:border-[2px] hover:border-[2px] hover:border-[#a375ff] ease-in duration-100 overflow-hidden">
              <div className="h-full w-[80%]">
                <input
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  value={Password}
                  className="h-full w-full bg-transparent outline-none px-6 placeholder:text-[#707070] text-[#707070]"
                />
              </div>
              <div className="h-full w-[20%] flex items-center justify-center">
                <HiOutlineLockClosed className="text-[1.3rem] text-[#707070]" />
              </div>
            </div>
            <button
              type="submit"
              disabled={Chargin === true && true}
              className="flex items-center justify-center w-[70%] h-[2.8rem] bg-[#a375ff] text-[#FFFFFF] rounded-xl hover:bg-[#946ae9] ease-in duration-200 active:scale-[0.9]"
            >
              {Chargin === true ? (
                <>
                  <VscLoading className="CharginIcon CharginIcon-Login animate-spin" />
                </>
              ) : (
                <>
                  <p>{Label}</p>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      {ShowLoading && (
        <div className="fixed inset-0 items-center justify-center bg-white z-[100] flex flex-col gap-[2rem]">
          <img src={require('../../assets/logos/MediKids_Colored-Logotype.png')} alt="" className="w-[30%] h-auto fade-in"/>
          <BeatLoader 
              color="#a375ff"
              aria-label="Loading Spinner"
              data-testid="loader"
          />
        </div>
      )}
    </>
  );
};
