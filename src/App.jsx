import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import SiparisFormu from './pages/SiparisFormu';
import { pizzaTheme } from './styles/theme';
function App(){
  return (
    <>
    <ThemeProvider>
     <Router>
      <Switch>
        <Route path="/PizzaSiparisi">
       <SiparisFormu />
        </Route>
      </Switch>
     </Router>
     </ThemeProvider>
    </>
  );
}

export default App;
