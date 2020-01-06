import React from 'react';
import { Route } from 'react-router-dom';
import DonationLIst from './components/DonationList';
import DetailInfo from './components/DetailInfo';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact={true} component={DonationLIst} />
      {/* <Route path="/:year" component={DonationLIst} /> */}
      <Route path="/detail" exact={true} component={DetailInfo} />
      <Route path="/detail/:name" component={DetailInfo} />
    </div>
  );
};

export default App;
