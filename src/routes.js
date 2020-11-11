import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'


export const useRoutes = isAuthenticated => {
        return (
            <Switch>
                <Route path="/catalog" exact component={CatalogPage}/>
                <Route path="/product/:id" exact component={ProductPage}/>
                <Route path="/auth/:auth" exact component={AuthPage} />
                <Redirect to="/catalog"/>
            </Switch>
        )
}