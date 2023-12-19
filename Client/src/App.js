import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const LandingPage = React.lazy(() => import('./views/landingPage/index'));
const ItemDetail = React.lazy(() => import('./views/itemDetail/index'));
const CheckOut = React.lazy(() => import('./views/checkOut/index'));
const ListItem = React.lazy(() => import('./views/listItem/index'));
const Testimony = React.lazy(() => import('./views/testimony/index'));
const Page404 = React.lazy(() => import('./views/Page404'));

class App extends Component {

  render() {
    return (
      <BrowserRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/admin/login" name="Login" render={props => <Login {...props}/>} />
              <Route path="/admin" name="Home" render={props => <TheLayout {...props}/>} />
              <Route exact path="/" name="Landing Page" render={props => <LandingPage {...props}/>} />
              <Route exact path="/item/:id" name="Item Page" render={props => <ItemDetail {...props}/>} />
              <Route exact path="/booking" name="Check Out" render={props => <CheckOut {...props}/>} />
              <Route exact path="/list" name="Check Out" render={props => <ListItem {...props}/>} />
              <Route exact path="/testimony" name="Check Out" render={props => <Testimony {...props}/>} />
              <Route component={Page404} />
            </Switch>
          </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
