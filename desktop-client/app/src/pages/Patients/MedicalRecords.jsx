import { useEffect, useState } from 'react'
import '../../assets/scss/SearchPatient.scss'
import { AiOutlineSearch } from 'react-icons/ai'
import PropagateLoader from "react-spinners/PropagateLoader";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from "react-router-dom";
import { useDash } from '../../context/DoctorContext';
import Modal from '../../components/Modal';
import { SearchViewRecord } from './PatientsComponents/SearchViewRecord';
import { SearchViewAppointmentHistory } from './PatientsComponents/SearchViewAppointmentHistory';

const AnimatedCard = () => {
  return (
    <div className="patient-card shadow-md">
      <div className="content-container">
        <div className="profile-photo-cnt">
          <div className="avatar w-[70%]">
            <div className="w-24 rounded-full">
              <Skeleton className="h-full w-full" circle={true}/>
            </div>
          </div>
        </div>
        <div className="patient-info-cnt">
          <div className="patient-info-row-1">
            <div className="patient-info-row-col-1">
              <Skeleton className="h-4/5"/>
              <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <Skeleton className="h-4/5"/>
            </div>
            <div className="patient-info-row-col-2">
              <Skeleton className="h-4/5"/>
              <div className="w-[70%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <Skeleton className="h-4/5"/>
            </div>
          </div>
          <div className="patient-info-row-1">
            <div className="patient-info-row-col-1">
              <Skeleton className="h-4/5"/>
              <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <Skeleton className="h-4/5"/>
            </div>
            <div className="patient-info-row-col-2">
              <Skeleton className="h-4/5"/>
              <div className="w-[70%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <Skeleton className="h-4/5"/>
            </div>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <div className='h-4/5 w-[20%]'>
          <Skeleton className="h-[80%] w-[20%]"/>
        </div>
        <div className='h-4/5 w-[20%]'>
          <Skeleton className="h-[80%] w-[20%]"/>
        </div>
      </div>
    </div>
  )
}

const InfoCard = ({ values }) => {
  const [active, setActive] = useState(false);
  const [numbercomp, setNumbercomp] = useState(0);
  const isModal = true;
  const toggle = () => {
    setActive(!active);
  };

  const modalContent = () => {
    switch (numbercomp) {
      case 1:
        return (
          <div isModal={isModal} className="m-10">
            <SearchViewRecord values={values}/> 
          </div>
        );
      case 2:
        return (
          <div isModal={isModal} className="m-10">
            <SearchViewAppointmentHistory values={values} />
          </div>
        );
      default:
        return <p>A</p>;
    }
  };
  return (
    <>
    <div className="patient-card shadow-md">
      <div className="content-container">
        <div className="profile-photo-cnt">
          <div class="avatar w-[70%]">
            <div class="w-24 rounded-full">
              <img src={values.Perfil_Photo} alt="" />
            </div>
          </div>
        </div>
        <div className="patient-info-cnt">
          <div className="patient-info-row-1">
            <div className="patient-info-row-col-1">
              <p className="text-[#A375FF] font-semibold text-[1.1rem]">Nombre:</p>
              <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <p className="text-[#707070]">{values.Name}</p>
            </div>
            <div className="patient-info-row-col-2">
              <p className="text-[#A375FF] font-semibold text-[1.1rem]">Edad:</p>
              <div className="w-[70%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <p className="text-[#707070]">{values.Age} año/s</p>
            </div>
          </div>
          <div className="patient-info-row-1">
            <div className="patient-info-row-col-1">
              <p className="text-[#A375FF] font-semibold text-[1.1rem]">Encargado:</p>
              <div className="w-[80%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <p className="text-[#707070]">{values.Responsible_Name}</p>
            </div>
            <div className="patient-info-row-col-2">
              <p className="text-[#A375FF] font-semibold text-[1.1rem]">Código:</p>
              <div className="w-[70%] h-[1px] bg-[#bbbbbb] margin-y"></div>
              <p className="text-[#707070]">{values.Patient_Code}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="actions-container">
        <Link className="btn btn-sm bg-[#a49bb7] hover:bg-[#9890a9] text-white"
          onClick={() => {
            toggle();
            setNumbercomp(1);
          }}
        >
          Ver Expediente
        </Link>
        <Link className="btn btn-sm bg-[#a49bb7] hover:bg-[#9890a9] text-white"
          onClick={() => {
            toggle();
            setNumbercomp(2);
          }}
        >
          Historial de citas
        </Link>
      </div>
    </div>
    {toggle && (
        <Modal
          active={active}
          toggle={toggle}
          onRequestClose={toggle}
        >
          {modalContent()}
        </Modal>
    )}
    </>
  )
}

export const MedicalRecords = () => {

  const { GetAllPatients, patients, ResponsiblesInfo, responsibles } = useDash();
  
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [InputName, setInputName] = useState('');
  const [PatientsCdc, setPatientsCdc] = useState([]);
  const [Loading, SetLoading] = useState(false);

  setTimeout(() => {
    setLoadingScreen(false);
  }, 3000);

  useEffect(() => {
    SetLoading(false);
    GetAllPatients();
    ResponsiblesInfo();
    setTimeout(() => {
      setLoadingScreen(false);
    }, 3000);
  }, [])

  const f_a = () => {
    const f_p_i = [];
    let obj = {};
    const patientsFiltered = patients.filter((item) => {
      const fullName = `${item.First_Names} ${item.Last_Names}`;
      return (fullName.toLowerCase().includes(InputName.toLowerCase()));
    })
    responsibles.map((item) => {
      patientsFiltered.map((el) => {
        if (el.Responsible_id == item.id) {
          obj.Patient_id = el.id;
          obj.Name = `${el.First_Names} ${el.Last_Names}`;
          obj.Age = el.Age;
          obj.Responsible_Name = `${item.First_Names} ${item.Last_Names}`;
          obj.Patient_Code = el.Patient_Code;
          obj.Perfil_Photo = el.Profile_Photo_Url;
          obj.Blood_Type = el.Blood_Type;
          obj.Weight = el.Weight;
          obj.Height = el.Height;
          obj.Phone = item.Phone;
          obj.Birthdate = el.Birthdate;
          f_p_i.push(obj);
        }
      })
    })
    return f_p_i;
  }

  useEffect(() => {
    SetLoading(true);
    if (InputName.length >= 3){
      setPatientsCdc(f_a());
    } else {
      
    }
    setTimeout(() => {
      SetLoading(false);
    }, 2000);
  }, [InputName]);

  return (
    <>
    {
      loadingScreen === true ?
      <div className="flex items-center justify-center w-full h-full">
        <PropagateLoader
          color="#a375ff"
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      :
      <>
        <div className="w-fit border-b-[0.1875rem] border-b-[#a375ff] mb-12">
          <h1 className="text-[#a375ff] font-bold text-3xl">
            Buscar paciente
          </h1>
        </div>
        <div className="shadow-md search-box-container">
          <button className="search-icon-cnt">
            <AiOutlineSearch className="text-[#707070] text-[2rem]"/>
          </button>
          <input type="text" onChange={(e) => {setInputName(e.target.value)}} className="input-search" placeholder="Ingrese el nombre del paciente"/>
        </div>

        <div className="results-box-container shadow-md">
          {
            Loading ?
              <>
                <AnimatedCard />
                <AnimatedCard />
                <AnimatedCard />
              </>
              :
                InputName ?
                  PatientsCdc.length > 0 ?
                    PatientsCdc.map((el, i) => {
                      return <InfoCard key={i} values={el} />
                    })
                    :
                    <div className="default-search-info-cnt">
                      <img src={require('../../assets/icons/no_search.png')} alt="hola" className="search-big-icon"/>
                      <p className="text-[#707070]">No se encontraron coincidencias</p>
                    </div>
                  :
                  <div className="default-search-info-cnt">
                    <img src={require('../../assets/icons/search.png')} alt="hola" className="search-big-icon"/>
                    <p className="text-[#707070]">Los resultados se mostrarán aqui</p>
                  </div>
          }
        </div>
      </>
    }
    </>
  );
};
