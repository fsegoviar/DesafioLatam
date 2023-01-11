import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomeAdmin, HomeStudentsPage, Login, PricesPage, FinishPaymentPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/servicio_cliente'} element={<HomeAdmin />} />
        <Route path={'/'} element={<HomeStudentsPage />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'tabla_precios'} element={<PricesPage />} />
        <Route path={'pago_finalizado'} element={<FinishPaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
