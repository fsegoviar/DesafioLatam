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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/servicio_cliente'} element={<SectionLinks />} />
        <Route path={'/formulario/:typeForm'} element={<HomeStudentsPage />} />
        <Route path={'/formulario'} element={<FormularioResponsePage />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'tabla_precios'} element={<SectionPayment />} />
        <Route path={'pago_aprobado'} element={<FinishPaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
