import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HomeStudentsPage,
  Login,
  FinishPaymentPage,
  SectionPayment
} from './pages';
import { SectionLinks } from './pages/admin/section-links';
import { FormularioResponsePage } from './pages/home-students/FormularioResponse.page';
import { RejectPaymentPage } from './pages/home-students/RejectPaymentPage';
import AuthLogin from './components/AuthLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={'/servicio_cliente'}
          element={
            <AuthLogin>
              <SectionLinks />
            </AuthLogin>
          }
        />
        <Route path={'/formulario/envelope'} element={<FormularioResponsePage />} />
        <Route path={'/formulario/:typeForm'} element={<HomeStudentsPage />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'tabla_precios'} element={<SectionPayment />} />
        <Route path={'pago_aprobado'} element={<FinishPaymentPage />} />
        <Route path={'pago_rechazado'} element={<RejectPaymentPage />} />
        <Route
          path={'error_transbank'}
          element={
            <RejectPaymentPage text="Algo salió mal con Transbank, por favor inténtalo nuevamente o comunicate con nosotros" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
