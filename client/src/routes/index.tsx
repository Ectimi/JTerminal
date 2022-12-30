import { Route, RouteObject, Routes } from 'react-router-dom';
import TerminalPage from '@/pages/TerminalPage';
import ResumePage from '@/pages/ResumePage';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <TerminalPage />,
  },
  {
    path: '/resume',
    element: <ResumePage />,
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path}/>
      ))}
    </Routes>
  );
}
