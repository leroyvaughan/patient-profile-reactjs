import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { NavBar } from '../components'
import { PatientsList } from '../pages'
import { PatientById } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/patients/list" exact component={PatientsList} />
                <Route
                    path="/patient/:id"
                    exact
                    component={PatientById}
                />
                <Redirect exact from="/" to="/patients/list" />
            </Switch>
        </Router>
    )
}


export default App