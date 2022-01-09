import React from 'react'
import LandingPage from './pages';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound'
import FavouritePokemon from './pages/FavouritePokemon'
import SearchPokemon from './pages/SearchPokemon'

import { Switch ,Route } from 'react-router-dom';

export const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/home" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />#
            <Route exact path="/signup" component={RegistrationPage} />
            <Route exact path="/dashboard/pokedex" component={Dashboard} />
            <Route exact path="/dashboard/search/:index" component={SearchPokemon} />
            <Route exact path="/dashboard/favourites" component={FavouritePokemon} />
            <Route exact path='*' component={NotFound} />
        </Switch>
    )
}
