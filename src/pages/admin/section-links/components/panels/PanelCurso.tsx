import { TabPanel, TabView } from 'primereact/tabview';
import { DocumentoEmitirComponent } from './components/DocumentoEmitirComponent';
import { FormaPagoComponent } from './components/FormaPagoComponent';
import { RenderIconPersonal } from './components/RenderIconPersonal';
import { RenderIconDeuda } from './components/RenderIconDeuda';
import { RenderIconRegistro } from './components/RenderIconRegistro';
import { CursoPersonal } from './view-curso/CursoPersonal';

type PropsPanelCurso = {
  title: string;
  infoUser: any;
};
export const PanelCurso = (props: PropsPanelCurso) => {
  return (
    <>
      <p className="text-xl font-bold text-center pb-5">
        Formulario de {props.title}
      </p>
      <TabView>
        <TabPanel header="Datos personales" headerTemplate={RenderIconPersonal}>
          <CursoPersonal dataUser={props.infoUser} />
        </TabPanel>
        <TabPanel
          header="Documento a emitir"
          headerTemplate={RenderIconRegistro}
        >
          <DocumentoEmitirComponent dataUser={props.infoUser} />
        </TabPanel>
        <TabPanel header="Forma de pago" headerTemplate={RenderIconDeuda}>
          <FormaPagoComponent dataUser={props.infoUser} />
        </TabPanel>
      </TabView>
    </>
  );
};
