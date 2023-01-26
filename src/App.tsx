import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  HomeAdmin,
  HomeStudentsPage,
  Login,
  PricesPage,
  FinishPaymentPage
} from './pages';

function App() {
  /*   useEffect(() => {
    const fetch = async () => {
      await axios
        .get('http://127.0.0.1:8000/api/clients', {
          headers: {
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((response) => console.log('Respuesta =>', response))
        .catch((error: any) => console.log('Error =>', error));
    };

    fetch();
  }, []);
 */
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/servicio_cliente'} element={<HomeAdmin />} />
        <Route path={'/formulario/:typeForm'} element={<HomeStudentsPage />} />
        <Route path={'login'} element={<Login />} />
        <Route path={'tabla_precios'} element={<PricesPage />} />
        <Route path={'pago_finalizado'} element={<FinishPaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
