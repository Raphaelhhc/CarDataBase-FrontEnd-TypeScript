import React from 'react';
import './App.css';
import { Navbar } from './layouts/partials/navbar';
import { Footer } from './layouts/partials/footer';
import { HomePage } from './layouts/homepage/homepage';
import { SearchPage } from './layouts/searchpage/searchpage';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { DetailPage } from './layouts/detailpage/detailpage';
import { oktaConfig } from './security/config/oktaconfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import LoginWidget from './security/authentication/loginwidget';
import { ReviewListPage } from './layouts/detailpage/reviewlistpage';
import { MyFavoritePage } from './layouts/myfavoritepage/myfavoritepage';
import { ManagePage } from './layouts/managepage/managepage';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  }

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  }

  return (
    <div className='d-flex flex-column min-vh-100'>

      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>

        <Navbar />

        <div className='flex-grow-1'>
          <Switch>

            <Route path='/' exact>
              <Redirect to='/home'/>
            </Route>

            <Route path='/home'>
              <HomePage/>
            </Route>

            <Route path='/search'>
              <SearchPage/>
            </Route>

            <Route path='/reviewlist/:carId'>
              <ReviewListPage/>
            </Route>

            <Route path='/detail/:carId'>
              <DetailPage/>
            </Route>

            <Route path='/login' render={() => <LoginWidget config={oktaConfig}/> } />

            <Route path='/login/callback' component={LoginCallback} />

            <SecureRoute path='/myfavorite'>
              <MyFavoritePage/>
            </SecureRoute>

            <SecureRoute path='/admin'>
              <ManagePage/>
            </SecureRoute>

          </Switch>
        </div>

        <Footer />

      </Security>

    </div>
  );
}

