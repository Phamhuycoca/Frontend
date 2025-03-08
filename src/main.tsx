import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './stores/store.ts';
import { AuthProvider } from './services/context/AuthProvider.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routers/routes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Routes>
            {routes.map((route) => {
              if (route.children) {
                return (
                  <Route key={route.path} path={route.path} element={route.element}>
                    {route.children.map((childRoute) => (
                      <Route key={childRoute.path} path={childRoute.path} element={childRoute.element} />
                    ))}
                  </Route>
                );
              }
              return <Route key={route.path} path={route.path} element={route.element} />;
            })}
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
