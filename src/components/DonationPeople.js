import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import db from '../firebase';
import DonationPeopleItem from './DonationPeopleItem';

const MainBlock = styled.div`
  display: flex;
  background-color: #f9f9f9;
`;

const DonationPeopleBlock = styled.div`
  flex: auto;
  padding: 50px 10px;
  min-width: 800px;
  margin-left: 240px;

  nav {
    display: flex;
    align-items: center;
    max-width: 1300px;
    ul {
      display: flex;
      list-style-type: none;
      margin: 0 0 0 30px;
      padding: 0;
      li {
        margin: 0;
        padding: 0;
        font-size: 16px;
      }
    }
  }

  .donationPeopleMid {
    margin-left: 30px;
    width: 180px;
  }
  .donationPeopleMidSearch {
    margin: 0 20px 10px 20px;
    border-bottom: black 1px solid;
    font-size: 12px;
    input {
      border: none;
      margin-top: 0;
      margin-left: 5px;
      background-color: transparent;

      &:focus {
        outline: none;
      }
    }
  }

  .order {
    font-size: 12px;
    margin: 20px 0 5px 20px;
    color: #868e96;
  }
  .donationPeopleBtm {
    /* border: red 1px solid; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
  }
`;
const ABlock = styled.a`
  color: black;
  text-decoration: none;
  margin: 10px 20px 20px 20px;
  display: block;

  &:hover {
    color: gray;
  }
  ${props =>
    props.active &&
    `
    color: #fab005;
    cursor: default;
    &:hover {
      color: #fab005;
    }
  `};
`;

const DonationPeople = ({ match, history, location }) => {
  // console.log(location.state);
  // console.log(history);
  const handleGoDetail = name => {
    // console.log(history);
    history.push('/detail/' + name);
  };
  const handleChange = e => {
    // console.log(e.target.value);
    setSearchName(e.target.value);
  };

  const job = match.params.job;
  const [peopleData, setPeopleData] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (location.state) {
      console.log('있다');
      setPeopleData(location.state);
    } else {
      console.log(`############로드데이터########`);
      async function getPeopleData() {
        let resPeopleData = await db
          .collection('stats')
          .doc('people')
          .get();

        setPeopleData(resPeopleData.data());
        history.replace({ state: resPeopleData.data() });
      }
      getPeopleData();
    }
  }, []);

  if (!peopleData) {
    return (
      <MainBlock>
        <Header category={'people'} />
        <div></div>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <Header category={'people'} />
      <DonationPeopleBlock>
        <nav>
          <ul>
            <li key="1">
              <ABlock href="/people/entertainer" active={job === 'entertainer'}>
                연예인
              </ABlock>
            </li>
            <li key="2">
              <ABlock href="/people/athlete" active={job === 'athlete'}>
                운동선수
              </ABlock>
            </li>
            <li key="3">
              <ABlock href="/people/creator" active={job === 'creator'}>
                크리에이터
              </ABlock>
            </li>
          </ul>
          <div className="donationPeopleMid">
            <div className="donationPeopleMidSearch">
              <span role="img" aria-label="Search">
                &#128269;
              </span>
              <input onChange={handleChange} />
            </div>
          </div>
        </nav>

        <div className="order">가나다순</div>
        <div className="donationPeopleBtm">
          {peopleData[job]
            .filter(value => value.name.indexOf(searchName) > -1)
            .map((value, idx) => (
              <DonationPeopleItem
                key={idx}
                obj={value}
                onClick={handleGoDetail}
              />
            ))}
        </div>
      </DonationPeopleBlock>
    </MainBlock>
  );
};

export default DonationPeople;
