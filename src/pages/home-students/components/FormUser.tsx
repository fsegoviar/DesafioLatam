import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormType = {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  tipoIdentificacion: string;
  numIdentificacion: string;
  codPais: string;
  numTelefono: string;
  correo: string;
  fechaNacimiento: string;
  nivelEducacional: string;
  nivelIngles: string;
  conocimientosPrevios: string;
  descripcionEducacion: string; // ¿Cuales?
  situacionLaboral: string;
  linkLinkedin: string;
  empresaActual: string;
  cargo: string;
  renta: number;
  carreraMatricula: string;
  genracion: string;
};

type PropsFormUser = {
  stepsLength: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  setComplete: (value: boolean) => void;
};

export const FormUser = (props: PropsFormUser) => {
  const {
    handleSubmit
  } = useForm<FormType>();

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
    props.currentStep === props.stepsLength
      ? props.setComplete(true)
      : props.setCurrentStep(props.currentStep + 1);
  };

  return (
    <form method='post' className='mt-5' onSubmit={handleSubmit(onSubmit)}>
      <label> Datos personales</label>
      <div className='flex'>
        <input type='text' placeholder='Nombre' disabled />
        <input type='text' placeholder='Apellido Paterno' />
        <input type='text' placeholder='Apellido Materno' />
        <input type='text' placeholder='Tipo de Identificación' />
      </div>
      <div className='grid grid-cols-3'>
        <input type='text' placeholder='Número de identificación' />
        <input type='text' placeholder='Código del país' />
        <input type='text' placeholder='Número de teléfono' />
      </div>
      <div className='grid grid-cols-3'>
        <input
          className='col-span-2'
          type='email'
          placeholder='Correo electrónico'
        />
        <input type='text' placeholder='Fecha de nacimiento' />
      </div>
      <div className='flex'>
        <input type='text' placeholder='Dirección' />
        <input type='text' placeholder='Ciudad' />
        <input type='text' placeholder='País de residencia' />
        <input type='text' placeholder='Nacionalidad' />
      </div>
      <div className='mt-3'>
        <label>Educación</label>
        <div className='grid grid-cols-2'>
          <input type='text' placeholder='Nivel educacional' />
          <input type='text' placeholder='Nivel de ingles' />
        </div>
        <div className='grid grid-cols-2'>
          <input type='text' placeholder='¿Posee conocimientos previos?' />
          <input type='text' placeholder='¿Cuales?' />
        </div>
      </div>
      <div className='mt-3'>
        <label>Empleabilidad</label>
        <div className='grid grid-cols-2'>
          <input type='text' placeholder='Situación laboral' />
          <input type='text' placeholder='Link Linkedin' />
        </div>
        <div className='grid grid-cols-3'>
          <input type='text' placeholder='Empresa donde trabaja' />
          <input type='text' placeholder='Cargo' />
          <input type='text' placeholder='Renta Actual' />
        </div>
      </div>
      <div className='mt-3'>
        <label>Registro</label>
        <div className='grid grid-cols-3'>
          <input
            type='text'
            className='col-span-2'
            placeholder='Carrera a la cual te estas matriculando'
          />
          <input type='text' placeholder='Generación a la que matrícula' />
        </div>
      </div>
      <div className='flex justify-end mt-5'>
        <button className='btn' type='submit'>
          Siguiente
        </button>
      </div>
    </form>
  );
};
