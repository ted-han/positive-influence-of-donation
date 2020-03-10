import React from 'react';
import { Route } from 'react-router-dom';
import DonationLIst from './components/DonationList';
import DetailInfo from './components/DetailInfo';
import DetailStats from './components/DonationStats';
import DonationPeople from './components/DonationPeople';
import DonationEvent from './components/DonationEvent';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Route path="/" exact={true} component={DonationPeople} />
      <Route path="/people/:job" component={DonationPeople} />
      <Route path="/stats/:year" component={DetailStats} />
      <Route path="/list" exact={true} component={DonationLIst} />
      <Route path="/detail/:name" component={DetailInfo} />
      <Route path="/event/:eventname" component={DonationEvent} />
    </div>
  );
};

export default App;
