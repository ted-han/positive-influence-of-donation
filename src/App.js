import React from 'react';
import { Route } from 'react-router-dom';
import DonationLIst from './components/DonationList';
import DetailInfo from './components/DetailInfo';
import DetailStats from './components/DonationStats';
import DonationPeople from './components/DonationPeople';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact={true} component={DonationLIst} />
      {/* <Route path="/:year" component={DonationLIst} /> */}
      <Route path="/stats" exact={true} component={DetailStats} />
      <Route path="/detail/:name" component={DetailInfo} />
      <Route path="/people/:job" component={DonationPeople} />
    </div>
  );
};

export default App;
