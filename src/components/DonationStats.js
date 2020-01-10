import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { numberToText } from '../myModule';

import db from '../firebase';

const MainBlock = styled.div`
  display: flex;
  height: 100%;
  background-color: #f9f9f9;
`;

const DetailStatsBlock = styled.div`
  flex: auto;
  padding: 80px;
  min-width: 800px;
  margin-left: 240px;
`;

const DetailStats = ({ match, history }) => {
  const handleGoDetail = name => {
    // console.log(history);
    history.push('/detail/' + name);
  };

  const [stateData, setStateData] = useState('');
  useEffect(() => {
    console.log(`############로드데이터########`);
    async function getStateData() {
      let resStateData = await db
        .collection('stats')
        .doc('totalRanking')
        .get();

      // console.log(resStateData.data().totalRanking);
      setStateData(resStateData.data().totalRanking);
    }
    getStateData();
  }, []);

  if (!stateData) {
    return (
      <MainBlock>
        <Header category={'stats'} />
        <div></div>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <Header category={'stats'} />
      <DetailStatsBlock>
        {stateData.map((value, idx) => (
          <div key={idx} onClick={() => handleGoDetail(value.name)}>
            {idx + 1}
            <img src={value.img} alt="사진" />
            {value.name} {numberToText(value.amount)}
          </div>
        ))}
      </DetailStatsBlock>
    </MainBlock>
  );
};

export default DetailStats;
