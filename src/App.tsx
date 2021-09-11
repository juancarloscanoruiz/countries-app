import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './views/Home/';
import 'antd/dist/antd.css';
import { CountryDetail } from './views/CountryDetail';

const App: React.FC = () => {

  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/country/:code" component={CountryDetail} />
        </Switch>
      </Router>
  );
}

export default App;
