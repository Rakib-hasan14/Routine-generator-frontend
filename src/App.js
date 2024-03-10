import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LoginComponent from './componenets/Login/Login';
import SignupComponent from './componenets/Signup/Signup';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Switch>
          <Route path='/login'>
            <LoginComponent />
          </Route>
          <Route path='/signup'>
            <SignupComponent />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;