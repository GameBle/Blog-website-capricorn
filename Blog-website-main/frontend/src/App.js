import './App.css';
import { Route, useParams} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Login from './pages/Login';
import Explore from './pages/Explore';
import Content from './pages/Content';

function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact />
      <Route path='/create' component={Create} exact />
      <Route path='/login' component={Login} exact />
      <Route path='/explore' component={Explore} exact />
      <Route path= '/:id' component ={Content} exact/>
    </div>
  );
}

export default App;
