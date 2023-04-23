import { Link }from 'react-router-dom'
import { useFormik } from 'formik';
import { GiBodyHeight } from 'react-icons/gi'
import { FaWeight, FaTemperatureHigh } from 'react-icons/fa'

export const EditMedicalRecord = () => {
  const validate = values => {
    const errors = {};
    if (!values.height) {
      errors.height = 'Este campo es obligatorio';
    } else if (values.height < 0 || values.height > 2.99)  {
      errors.height = 'Ingrese una medida válida';
    }
    
    if (!values.weight) {
      errors.weight = 'Este campo es obligatorio';
    } else if (values.weight < 0 || values.weight > 400) {
      errors.weight = 'Ingrese una medida válida';
    }
    
    if (!values.temp) {
      errors.temp = 'Este campo es obligatorio';
    } else if (values.temp < 0 || values.temp > 60) {
      errors.temp = 'Ingrese una medida válida';
    }
    
    return errors;
  };

  const SignupForm = () => {
    const formik = useFormik({
        initialValues: {
            height: '',
            weight: '',
            temp: '',
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
      <form onSubmit={formik.handleSubmit} className='h-fit w-[90%] mx-auto flex flex-col mt-7'>
          <div className='flex flex-col'>
            <div className='inline-flex justify-center items-center gap-3'>
              <GiBodyHeight className='text-[1.8rem] text-[#A375FF]'/>
              <input
                id="height"
                name="height"
                type="number"
                step=".01"
                placeholder='Ingrese la altura'
                onChange={formik.handleChange}
                value={formik.values.height}
                className={formik.errors.height ? 'w-[20rem] h-[3rem] rounded-xl border border-red-500 outline-none px-[0.3125rem]' : 'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
              />
            <select className="select w-full max-w-xs">
              <option disabled selected>Unidad de medida</option>
              <option>mt</option>
              <option>cm</option>
              <option>pul</option>
              <option>ft</option>
            </select>
            </div>
            <div >
              {formik.errors.height ? <div className='mx-auto text-red-500 font-italic w-[17rem]'>{formik.errors.height}</div> : null}
            </div>
            
          </div>
          <div className='flex flex-col my-5'>
            <div className='inline-flex justify-center items-center gap-3'>
              <FaWeight className='text-[1.8rem] text-[#A375FF]'/>
              <input
                id="weight"
                name="weight"
                type="number"
                step='.01'
                placeholder='Ingrese El peso'
                onChange={formik.handleChange}
                value={formik.values.weight}
                className={formik.errors.weight ? 'w-[20rem] h-[3rem] rounded-xl border border-red-500 outline-none px-[0.3125rem]' : 'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
              />
              <select className="select w-full max-w-xs">
                <option disabled selected>Unidad de medida</option>
                <option>lb</option>
                <option>Kg</option>
              </select>
            </div>
            <div >
              {formik.errors.weight ? <div className='mx-auto text-red-500 font-italic w-[17rem]'>{formik.errors.weight}</div> : null}
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='inline-flex justify-center items-center gap-3'>
              <FaTemperatureHigh className='text-[1.8rem] text-[#A375FF]'/>
              <input
                id="temp"
                name="temp"
                type="number"
                step='.01'
                placeholder='Ingrese la temperatura'
                onChange={formik.handleChange}
                value={formik.values.temp}
                className={formik.errors.temp ? 'w-[20rem] h-[3rem] rounded-xl border border-red-500 outline-none px-[0.3125rem]' : 'w-[20rem] h-[3rem] rounded-xl border border-[#BBBBBB] outline-none px-[0.3125rem]'}
              />
              <select className="select w-full max-w-xs">
                <option disabled selected>Unidad de medida</option>
                <option>°C</option>
                <option>°F</option>
              </select>
            </div>
            
            <div >
              {formik.errors.temp ? <div className='mx-auto text-red-500 font-italic w-[17rem]'>{formik.errors.temp}</div> : null}
            </div>
          </div>
      
          
      
          <button type="submit">Submit</button>
      </form>
    );
  };

  return(
    <>
      {SignupForm()}
    </>
  );
}
