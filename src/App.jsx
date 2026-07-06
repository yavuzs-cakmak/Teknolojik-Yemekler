import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SiparisFormu from './pages/SiparisFormu';
import GlobalStyles from './styles/GlobalStyles';
import { pizzaTheme } from './styles/theme';
import SiparisOnayi from './pages/SiparisOnayi';
import Anasayfa from './pages/Anasayfa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
function App(){
  return (
    <>
    <ThemeProvider theme={pizzaTheme}>
      <GlobalStyles />
     <Router>
      <Switch>
        <Route exact path="/">
            <Anasayfa />
          </Route>
        <Route path="/PizzaSiparisi">
       <SiparisFormu />
        </Route>
        <Route path="/Onay">
            <SiparisOnayi />
          </Route>
      </Switch>
     </Router>
     </ThemeProvider>
     <ToastContainer />
    </>
  );
}

export default App;
