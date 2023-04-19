import React from "react";

export const ActivePatients = () => {
  return (
    <>
      <h1 className="text-[#a375ff] font-bold text-3xl after:content-[''] after:bg-[#a375ff] after:block after:w-[30%] after:h-[0.1875rem] after:mx-0 after:my-auto">
        Pacientes activos
      </h1>

      <div className="overflow-x-auto w-full my-6 mx-auto">
        <table className="table w-full border-collapse border border-slate-500 rounded-lg">
          <tr className="text-center">
            <th>Paciente</th>
            <th>Número de código</th>
            <th></th>
          </tr>
          {/* Un tr por paciente */}
          <tr className="text-center hover">
            <td>
              <div className="flex items-center space-x-3">
                {/* Foto de perfil */}
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={require("../../assets/template/avatar.jpg")}
                      alt="Avatar"
                    />
                  </div>
                </div>
                {/* Nombre y algún dato extra */}
                <div>
                  <div className="font-bold">
                    Daniel Ernesto Vásquez Venturax
                  </div>
                  <div className="text-sm opacity-50">9 años</div>
                </div>
              </div>
            </td>

            <td>
              <span className="badge badge-ghost badge-lg bg-green-400">
                XX12345
              </span>
            </td>

            <th>
              <button className="btn btn-outline btn-xs hover:bg-[#a375ff]">
                Ver detalles
              </button>
            </th>
          </tr>

          <tr className="text-center hover">
            <td>
              <div className="flex items-center space-x-3">
                {/* Foto de perfil */}
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <img
                      src={require("../../assets/template/avatar.jpg")}
                      alt="Avatar"
                    />
                  </div>
                </div>
                {/* Nombre y algún dato extra */}
                <div>
                  <div className="font-bold">
                    Daniel Ernesto Vásquez Venturax
                  </div>
                  <div className="text-sm opacity-50">9 años</div>
                </div>
              </div>
            </td>

            <td>
              <span className="badge badge-ghost badge-lg bg-green-400">
                XX12345
              </span>
            </td>

            <th>
              <button className="btn btn-outline btn-xs hover:bg-[#a375ff]">
                Ver detalles
              </button>
            </th>
          </tr>
        </table>
      </div>
    </>
  );
};
