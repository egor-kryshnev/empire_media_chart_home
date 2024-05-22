import './App.css';
import { BrowserRouter as Router, Navigate, useRoutes } from 'react-router-dom';
import Home from './components/Home/Home';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from "./theme/Theme"
import { useEffect } from 'react';
import { initStocksActionCreator } from "./store/actions/stocksActions/stocksActionCreator"
import { useDispatch } from 'react-redux';

export const RouteNames = {
  Home: "/home",
  History: "/history"
}

const Routes = () => {
  const routes = useRoutes([
    {
      path: RouteNames.Home,
      element: <Home />
    },
    {
      path: RouteNames.History,
      element: <Home />
    },
    {
      path: "*",
      element: <Navigate to={RouteNames.Home} replace />
    }
  ])

  return routes;
}

const AppRouter = () => {

  return (
    <>
      <Router>
        <Routes />
      </Router>
    </>
  )
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await dispatch(initStocksActionCreator());
    };
    load();
  }, [dispatch])

  return (
    <>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
