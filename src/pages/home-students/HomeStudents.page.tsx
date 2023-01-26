import { useParams } from 'react-router-dom';
import { Navbar } from '../../components';
import './styles.css';
import { FormCarrera } from './components/form-carrera/FormCarrera';
import { FormCurso } from './components/form-curso/FormCurso';

export const HomeStudentsPage = () => {
  const { typeForm } = useParams();

  return (
    <>
      <Navbar />
      <div
        className="pt-48 p-10 w-full h-auto min-h-screen flex justify-center"
        style={{ background: '#F9F9F9' }}
      >
        {(() => {
          switch (typeForm) {
            case 'registro_carrera':
              return <FormCarrera />;
            case 'registro_curso':
              return <FormCurso />;
            default:
              break;
          }
        })()}
      </div>
    </>
  );
};
