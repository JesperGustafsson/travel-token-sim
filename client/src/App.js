import './App.css';
import Navbar from './components/Navbar'
import Home from './views/Home'
import Simulator from './views/Simulator'
import Login from './views/Login'
import MyPage from './views/MyPage'
import {BrowserRouter, Route} from 'react-router-dom'
import { MainContainer } from './Styles'
import Register from './views/Register';

function App() {
  return (
    
  <BrowserRouter>
    <Navbar />
    <MainContainer>
      <Route exact path ="/">
        <Home />
      </Route>
      <Route exact path ="/simulator">
        <Simulator />
      </Route>
      <Route exact path ="/login">
        <Login />
      </Route>
      <Route exact path ="/register">
        <Register />
      </Route>
      <Route exact path ="/mypage">
        <MyPage />
      </Route>
    </MainContainer>
  </BrowserRouter>
  );
}

export default App;
