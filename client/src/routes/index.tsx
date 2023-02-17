import { Suspense, lazy } from 'react';
import { Route, RouteObject, Routes } from 'react-router-dom';
import TerminalPage from '@/pages/TerminalPage';
import { Loader } from '@mantine/core';

const ResumePage = await lazy(() => import('@/pages/ResumePage'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <TerminalPage />,
  },
  {
    path: '/resume',
    element: (
      <Suspense
        fallback={
          <Loader
            sx={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          />
        }
      >
        <ResumePage />
      </Suspense>
    ),
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route path={route.path} element={route.element} key={route.path} />
      ))}
    </Routes>
  );
}
