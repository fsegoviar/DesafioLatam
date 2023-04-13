import { TabPanel, TabView } from 'primereact/tabview';
import { DatosPersonalesCarrera } from './components/DatosPersonalesCarrera';
import { EducacionComponent } from './components/EducacionComponent';
import { LaboralComponent } from './components/LaboralComponent';
import { DocumentoEmitirComponent } from './components/DocumentoEmitirComponent';
import { FormaPagoComponent } from './components/FormaPagoComponent';
import { AvalComponent } from './components/AvalComponent';
import { RenderIconPersonal } from './components/RenderIconPersonal';
import { RenderIconEducacion } from './components/RenderIconEducacion';
import { RenderIconEmpleabilidad } from './components/RenderIconEmpleabilidad';
import { RenderIconRegistro } from './components/RenderIconRegistro';
import { RenderIconDeuda } from './components/RenderIconDeuda';
import { RenderIconFacturacion } from './components/RenderIconFacturacion';

type PanelCarreraProps = {
  infoUser: any;
};

export const PanelCarrera = (props: PanelCarreraProps) => {
  return (
    <>
      <p className="text-xl font-bold text-center pb-5">
        Formulario de Carrera
      </p>
      <TabView>
        <TabPanel header="Datos personales" headerTemplate={RenderIconPersonal}>
          <DatosPersonalesCarrera dataUser={props.infoUser} />
        </TabPanel>
        <TabPanel header="Educación" headerTemplate={RenderIconEducacion}>
          <EducacionComponent dataUser={props.infoUser} />
        </TabPanel>
        <TabPanel
          header="Datos laborales"
          headerTemplate={RenderIconEmpleabilidad}
        >
          <LaboralComponent dataUser={props.infoUser} />
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
        <TabPanel header="Aval" headerTemplate={RenderIconFacturacion}>
          <AvalComponent dataUser={props.infoUser} />
        </TabPanel>
      </TabView>
    </>
  );
};
