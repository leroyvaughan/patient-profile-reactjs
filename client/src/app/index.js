import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components'
import { MoviesList } from '../pages'
import { MoviesInsert } from '../pages'
import { MoviesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/movies/list" exact component={MoviesList} />
                <Route path="/movies/create" exact component={MoviesInsert} />
                <Route
                    path="/movies/update/:id"
                    exact
                    component={MoviesUpdate}
                />
                <Redirect exact from="/" to="/movies/list" />
            </Switch>
        </Router>
    )
}


export default App