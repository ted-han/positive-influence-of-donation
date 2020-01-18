import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { numberToText } from '../myModule';

import db from '../firebase';

const MainBlock = styled.div`
  display: flex;
  background-color: #f9f9f9;
`;

const DetailStatsBlock = styled.div`
  flex: auto;
  padding: 50px 150px;
  min-width: 800px;
  margin-left: 240px;

  .total {
    font-weight: bold;
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 1em;
    color: blueviolet;
  }
  .statsTop {
    display: flex;
    justify-content: space-between;
    /* border: red 1px solid; */
  }
  .statsTopList {
    text-align: center;
    margin: 20px;
    width: 250px;
    padding: 30px 40px 50px 40px;
    background-color: white;
    cursor: pointer;
    &:hover {
      background-color: #ffe8cc;
    }

    .topListImg {
      height: 140px;
      display: flex;
      justify-content: center;
      align-items: flex-end;

      img {
        height: 100%;
        border-radius: 50%;
      }
      div {
        margin-left: -40px;
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
      }
      .first {
        background-color: gold;
      }
      .second {
        background-color: silver;
      }
      .third {
        background-color: chocolate;
      }
    }
    .topListName {
      font-size: 24px;
      font-weight: bold;
      padding-top: 16px;
    }
    .topListAmount {
      margin-top: 18px;
      font-size: 18px;
    }
  }
  .statsMid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5px;
    margin: 10px 0 -7px 0;
  }
  .statsMidSearch {
    margin: 0 20px;
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

  .statsMidInfo {
    margin: 0 20px;
    font-size: 24px;
    text-align: right;
    position: relative;
    display: inline-block;
  }

  .tooltip {
    width: 120px;
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

  .statsBtm {
    /* border: red 1px solid; */
  }
  .statsBtmList {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin: 10px 20px;
    text-align: center;
    background-color: white;
    height: 80px;
    cursor: pointer;
    &:hover {
      background-color: #ffe8cc;
    }

    .btmListRank {
      flex-grow: 1;
      flex-basis: 40px;
      color: #868e96;
      font-size: 16px;
    }
    .btmListImg {
      /* border: red 1px solid; */
      flex-grow: 1;
      flex-basis: 60px;

      img {
        width: 60px;
        height: 60px;
        /* height: 100%; */
        border-radius: 50%;
      }
    }
    .btmListName {
      flex-grow: 1;
      font-size: 18px;
    }
    .btmListBlank {
      flex-grow: 18;
    }
    .btmListCnt {
      flex-grow: 3;
    }
    .btmListAmount {
      flex-grow: 3;
      flex-basis: 100px;
    }
  }
`;

const DetailStats = ({ match, history }) => {
  const handleGoDetail = name => {
    console.log(history);
    history.push('/detail/' + name);
  };

  const [searchName, setSearchName] = useState('');
  const [statsData, setStatsData] = useState('');
  const [year, setYear] = useState('2019');

  const handleChange = e => {
    // console.log(e.target.value);
    setSearchName(e.target.value);
  };

  const handleClick = () => {
    let go = year === '2019' ? '2020' : '2019';
    setYear(go);
  };

  useEffect(() => {
    console.log(`############로드데이터########`);
    async function getStatsData() {
      let resStatsData = await db
        .collection('stats')
        .doc('perYearRanking')
        .get();

      setStatsData(resStatsData.data());
    }
    getStatsData();
  }, []);

  if (!statsData) {
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
        <div onClick={handleClick}>연도변경</div>
        <div className="total">
          <div>{year}</div>
          <span role="img" aria-label="Search">
            🧡🧡 {numberToText(statsData[year].total)} 🧡🧡
          </span>
        </div>
        <div className="statsTop">
          {statsData[year].list.map(value => {
            if (value.id > 3) return null;
            return (
              <div
                className="statsTopList"
                key={value.id}
                onClick={() => handleGoDetail(value.name)}
              >
                <div className="topListImg">
                  <img src={value.img} alt="사진" />
                  <div
                    className={
                      value.id === 1
                        ? 'first'
                        : value.id === 2
                        ? 'second'
                        : 'third'
                    }
                  >
                    {value.id === 1 ? '1st' : value.id === 2 ? '2nd' : '3rd'}
                  </div>
                </div>
                <div className="topListName">{value.name}</div>
                <div className="topListCnt">{value.cnt}회</div>
                <div className="topListAmount">
                  {numberToText(value.amount)}
                </div>
              </div>
            );
          })}
        </div>

        <div className="statsMid">
          <div className="statsMidSearch">
            <span role="img" aria-label="Search">
              &#128269;
            </span>
            <input onChange={handleChange} />
          </div>
          <div className="statsMidInfo">
            <span className="tooltip">
              기부금액 기준
              <br />
              (물품 및 활동 제외)
            </span>
            &#x2139;
          </div>
        </div>

        <div className="statsBtm">
          {statsData[year].list
            .filter(value => value.name.indexOf(searchName) > -1)
            .map(value => {
              if (value.id < 4) return null;
              return (
                <div
                  className="statsBtmList"
                  key={value.id}
                  onClick={() => handleGoDetail(value.name)}
                >
                  <div className="btmListRank">{value.id}</div>
                  <div className="btmListImg">
                    <img src={value.img} alt="사진" />
                  </div>
                  <div className="btmListName">{value.name}</div>
                  <div className="btmListBlank"></div>
                  <div className="btmListCnt">{value.cnt}회</div>
                  <div className="btmListAmount">
                    {numberToText(value.amount) || '자선활동'}
                  </div>
                </div>
              );
            })}
        </div>
      </DetailStatsBlock>
    </MainBlock>
  );
};

export default DetailStats;
