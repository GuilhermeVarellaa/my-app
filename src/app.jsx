import React, { useContext } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import { AuthContext } from './app/Context/auth.jsx';

/* Paginas */
import Site from './site/site.jsx';
import Login from './app/Login/login';
import NovaConta from './app/NovaConta/novaconta';
import ResetSenha from './app/ResetSenha/resetsenha';
import Home from './app/Home/home';
import NovoCliente from './app/NovoCliente/novocliente';
import EditarCliente from './app/EditarCliente/editarcliente';


function App(){
    const {logado} = useContext(AuthContext);

    function SecureRoute({...params}){
      if (!logado){
        return <Redirect to="/app" />
      } else {
      return <Route {...params} />
      }
    }
    
    return <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Site} />    
      <Route exact path='/app' component={Login} />    
      <Route exact path='/app/novaconta' component={NovaConta} />    
      <Route exact path='/app/resetsenha' component={ResetSenha} />    

      <SecureRoute exact path='/app/home' component={Home} />    
      <SecureRoute exact path='/app/novocliente' component={NovoCliente} />
      <SecureRoute exact path='/app/editarcliente/:id' component={EditarCliente} />
      </Switch>
    </BrowserRouter>;
  }
 
export default App;