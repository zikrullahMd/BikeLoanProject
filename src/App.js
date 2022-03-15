import './App.css';
import Login from "./components/user/Login";
import Signup from "./components/user/Signup";
import Dashboard from './components/admin/Dashboard';
import AddLoan from "./components/user/AddLoan";
import ViewLoan from './components/user/ViewLoan';
import ViewProfile from './components/user/ViewProfile';
import ApplySuccess from './components/user/ApplySuccess';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/' element={< Login />}></Route>
          <Route path='user/signup' element={< Signup />}></Route>
          <Route path='user/login' element={< Login />}></Route>
          <Route path='user/addLoan' element={< AddLoan />}></Route>
          <Route path='user/viewLoan' element={< ViewLoan />}></Route>
          <Route path='user/getProfile' element={< ViewProfile />}></Route>
          <Route path='user/success' element={< ApplySuccess />}></Route>
          <Route path='admin/getAllLoans' element={< Dashboard />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
