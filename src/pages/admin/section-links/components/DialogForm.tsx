import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { PanelCarrera } from './panels/PanelCarrera';
import { PanelCurso } from './panels/PanelCurso';

type DialogType = {
  open: boolean;
  close: () => void;
  userData: any;
};

export const DialogForm = (props: DialogType) => {
  const modalRef = useRef<HTMLDivElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const [infoPanel, setInfoPanel] = useState<any>(null!);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    if (!infoPanel) fetchDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setInfoPanel]);

  useEffect(() => {
    if (props.open) modalRef.current.style.display = 'flex';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDataUser = async () => {
    setLoading(true);
    await axios
      .get(
        `${process.env.REACT_APP_API_BACKEND}/registers/${props.userData.id}`
      )
      .then((response: any) => {
        console.log('Response User =>', response.data[0]);
        setInfoPanel(response.data[0]);
        setLoading(false);
      })
      .catch((error: AxiosError) =>
        console.log('Error Fetch Data User =>', error)
      );
  };

  const closeModal = (): void => {
    containerRef.current.classList.add('close');
    setTimeout(() => {
      containerRef.current.classList.remove('close');
      modalRef.current.style.display = 'none';
      props.close();
    }, 1000);
  };

  window.addEventListener(
    'click',
    (e: any) => e.target === modalRef.current && closeModal()
  );

  const RenderPanel = () => {
    if (infoPanel !== null) {
      switch (infoPanel.form_type.description) {
        case 'Carrera':
          return <PanelCarrera infoUser={infoPanel} />;
        case 'Curso':
          return <PanelCurso title={'Curso'} infoUser={infoPanel} />;
        case 'Taller':
          return <PanelCurso title={'Taller'} infoUser={infoPanel} />;
        case 'Reintegro':
          return <PanelCurso title={'Reintegro'} infoUser={infoPanel} />;
        default:
          return <>default</>;
      }
    }
    return <>nodata</>;
  };

  return (
    <div className="window-background" id="window-background" ref={modalRef}>
      <div
        className="window-container width-form"
        id="window-container"
        ref={containerRef}
      >
        {loading ? <p>Cargando</p> : <RenderPanel />}
        <div className="mt-5  w-full flex justify-end">
          <button
            className="m-1 px-5 rounded-lg text-white bg-gray-500"
            style={{ border: '3px solid gray' }}
            onClick={() => closeModal()}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
