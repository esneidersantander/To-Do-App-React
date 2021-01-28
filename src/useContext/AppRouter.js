import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { Navbar } from './Navbar';
import { AboutScreen } from './AboutScreen';
import { HomeScreen } from './HomeScreen';
import { LoginScreen } from './LoginScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Navbar/>
                <div className="container">
                    <Switch>
                        <Route exact path='/' component={HomeScreen}/>
                        <Route exact path='/about' component={AboutScreen}/>
                        <Route exact path='/login' component={LoginScreen}/>

    {/*                     esta linea es para que cuando se intetne ingresar una urlque no sea ninguna de las anteriores
                        redirecccione a la ruta principal */}
                        <Redirect to='/'/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}
