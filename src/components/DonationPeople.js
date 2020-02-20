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
    margin-bottom: 5px;

    .statsMidInfo {
      /* color: grey; */
      margin: 0 15px -25px 15px;
      font-size: 16px;
      text-align: right;
      position: relative;
      display: inline-block;
      cursor: default;
    }
    .tooltip {
      width: 140px;
      font-size: 12px;
      visibility: hidden;
      background-color: #f1f3f5;
      border-radius: 6px;
      padding: 3px;
      position: absolute;
      z-index: 1;
      margin-top: 4px;
      left: 105%;
      text-align: center;
    }
    .statsMidInfo:hover .tooltip {
      visibility: visible;
    }
  }
  .donationPeopleBtm {
    /* border: red 1px solid; */
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
  }
`;

const SpanBlock = styled.span`
  font-size: 12px;
  margin-left: 10px;
  color: #868e96;
  cursor: pointer;

  &:hover {
    color: black;
  }
  ${props =>
    props.active &&
    `
    color: black;
    &:hover {
      color: black;
    }
  `};
`;

const ABlock = styled.a`
  color: black;
  text-decoration: none;
  margin: 10px 20px 30px 20px;
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
    // console.log(window.scrollY); // 현재 스크롤 높이
    history.replace({
      state: { ...peopleData, scrollY: window.scrollY }
    });
    history.push('/detail/' + name);
  };
  const handleChange = e => {
    // console.log(e.target.value);
    setSearchName(e.target.value);
  };

  const handleChangeSort = sort => {
    if (sort === 'char') {
      if (peopleData.sortChar) {
        setPeopleData({
          sort: 'char',
          sortChar: !peopleData.sortChar,
          list: {
            [job]: peopleData.list[job].sort(function(a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              // a must be equal to b
              return 0;
            })
          }
        });
      } else {
        setPeopleData({
          sort: 'char',
          sortChar: !peopleData.sortChar,
          list: {
            [job]: peopleData.list[job].sort(function(a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              // a must be equal to b
              return 0;
            })
          }
        });
      }
    } else {
      setPeopleData({
        sort: 'amount',
        sortChar: false,
        list: {
          [job]: peopleData.list[job].sort(function(a, b) {
            if (a.amount > b.amount) {
              return -1;
            }
            if (a.amount < b.amount) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })
        }
      });
    }
  };

  const job = match.params.job || 'entertainer';
  const [peopleData, setPeopleData] = useState({
    sort: location.state ? location.state.sort : 'char',
    sortChar: location.state ? location.state.sortChar : true
  });
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

        setPeopleData({ ...peopleData, list: resPeopleData.data() });
      }
      getPeopleData();
    }
  }, []);

  useEffect(() => {
    history.replace({
      state: { ...peopleData }
    });
    console.log('히스토리 업데이트');
  }, [history, peopleData]);

  if (!peopleData.list) {
    console.log('render2');
    return (
      <MainBlock>
        <Header category={'people'} />
        <div></div>
      </MainBlock>
    );
  }

  console.log('render');
  if (location.state.scrollY) {
    // const scrollHeight = document.getElementById('root').scrollHeight;
    // const clientHeight = document.getElementById('root').clientHeight;
    // const scrollY = window.scrollY;
    window.scrollTo(0, location.state.scrollY);

    history.replace({
      state: { ...peopleData, scrollY: 0 }
    });
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

        <div className="order">
          <SpanBlock
            onClick={() => handleChangeSort('char')}
            active={peopleData.sort === 'char'}
          >
            가나다순
          </SpanBlock>
          <SpanBlock
            onClick={() => handleChangeSort('amount')}
            active={peopleData.sort === 'amount'}
          >
            금액순
          </SpanBlock>
          <div className="statsMidInfo">
            <span className="tooltip">2019년 이후 정보입니다.</span>
            &#x2139;
          </div>
        </div>

        <div className="donationPeopleBtm">
          {peopleData.list[job]
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
