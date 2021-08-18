import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Login from '/imports/ui/pages/login';
import Registration from '/imports/ui/pages/register';
import Dashboard from '/imports/ui/pages/dashboard';
import NotFound from '/imports/ui/pages/notfound';
import theme from '/imports/ui/components/themes/theme'
import { userContext } from '../ui/components/contexts/userContext';

function PrivateRoute({ children, user, auth }){
  return (
    <Route
      render={({ location }) => 
      (user) ? 
          (children) 
        : 
          (
            <Redirect to={{
              pathname: '/',
              state: { from: location }
            }}
            />
          )
      }
    />
  )
}

export default function Index(){
  const user = localStorage.getItem('Meteor.userId');
  const [auth, setAuth] = useState(false);


  return (
    <ChakraProvider theme={theme} >
      <userContext.Provider value={user}>
        <BrowserRouter basename='/' >
          <Switch>
            <Route exact path='/' >
              <Login setAuth={setAuth}/>
            </Route>
            <Route path='/register' component={Registration} />
            <PrivateRoute path='/hermes' user={user} auth={auth}>
              <Dashboard setAuth={setAuth} />
            </PrivateRoute>
            <Route path='/*' component={NotFound} />
          </Switch>
        </BrowserRouter>
      </userContext.Provider>
    </ChakraProvider>
  ) 
}