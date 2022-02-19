//import {Route, Switch } from 'react-router-dom';
import {useAuth0} from '@auth0/auth0-react';

import Timer from './Components/Timer';
//import Error from './Components/Error';
import Signout from './Components/Signout';
import Signin from './Components/Signin';


/*
const Router = () => {
  return (
    <>
        <Switch>
        <Route exact path="/">
            <Signin />
          </Route>
          <Route exact path="/timer">
            <Timer />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signout">
            <Signout />
          </Route>
          <Route path='*'>
            <Error />
          </Route>
        </Switch>
    </>
  )
}
*/

function App() {
  const {isAuthenticated} = useAuth0();
  return (
    <>
      <Signout />
      <h1>Welcome</h1>
      {isAuthenticated ? <Timer /> : <h1>You need to Signin First <Signin /></h1>}
    </>
  );
}

export default App;
