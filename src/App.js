import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { theme } from "./theme/Theme"
import { useEffect } from 'react';
import { initStocksActionCreator } from "./store/actions/stocksActions/stocksActionCreator"
import { useDispatch } from 'react-redux';

export const RouteNames = {
  Home: "/"
}

const Routess = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={`${RouteNames.Home}`} element={<Home />}/>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
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
            <Routess />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
}

export default App;
