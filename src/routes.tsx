import { Route, Routes } from 'react-router-dom';
import Home from './views/home';
import PacientesCreate from './views/pacientes/create';
import ProntuariosCreate from './views/prontuarios/create';
import Pacientes from './views/pacientes';
import Prontuarios from './views/prontuarios';
import Agendamentos from './views/agendamentos';
import Login from './views/login';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/pacientes" element={<Pacientes />} />
            <Route path="/pacientes/novo" element={<PacientesCreate />} />
            <Route path="/pacientes/:id/editar" element={<PacientesCreate />} />
            <Route path="/prontuarios" element={<Prontuarios />} />
            <Route path="/prontuarios/novo" element={<ProntuariosCreate />} />
            <Route path="/prontuarios/:id/editar" element={<ProntuariosCreate />} />
            <Route path="/agendamentos" element={<Agendamentos />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<Login />} />
        </Routes>
    );
}

function NotFound() {
    return <h1>404 - Page Not Found</h1>;
}