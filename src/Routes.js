import React from 'react'
import LandingPage from './pages';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'
import {ReadMe} from './pages/ReadMe'
import {AboutMe} from './pages/AboutMe'
import { FavouritePokemon} from './pages/FavouritePokemon'
import SearchPokemon from './pages/SearchPokemon'
import useAuth from './components/useAuth';
import ProtectedRoutes from './ProtectedRoutes'

import { Switch ,Route } from 'react-router-dom';

export const Routes = (user) => {
    const [isAuth, login, logout] = useAuth(false)
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={RegistrationPage} />
            <Route exact path="/Read Me" component={ReadMe} />
            <Route exact path='*' component={NotFound} />
            <ProtectedRoutes path="/dashboard/profile" component={() => <AboutMe user={user}/>} auth={isAuth}/>
            <ProtectedRoutes path="/dashboard/pokedex" component={Dashboard} auth={isAuth}/>
            <ProtectedRoutes path="/dashboard/search/:index" component={SearchPokemon} auth={isAuth}/>
            <ProtectedRoutes path="/dashboard/favourites" component={FavouritePokemon} auth={isAuth}/>
        </Switch>
    )
}
