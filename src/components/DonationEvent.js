import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { numberToText } from '../myModule';
import db from '../firebase';

const MainBlock = styled.div`
  display: flex;
  background-color: #f9f9f9;
`;

const DonationEventBlock = styled.div`
  flex: auto;
  padding: 40px 160px;
  min-width: 800px;
  margin-left: 240px;

  .detailTop {
    text-align: center;
    padding-bottom: 40px;

    .nameBlock {
      font-size: 30px;
      font-weight: bold;
      padding-bottom: 10px;
    }
    .totalBlock {
      font-size: 18px;
      display: flex;
      justify-content: center;
      div {
        width: 150px;
        /* border: 1px solid black; */
        img {
          width: 90px;
          height: 90px;

          /* height: 100%; */
        }
        p {
          margin-bottom: 2px;
        }
      }
    }
  }

  .detailBtm {
    text-align: center;

    table {
      width: 100%;
      border: 1px solid black;
      border-collapse: collapse;
      tbody > tr:hover {
        background-color: #fff176;
      }
      .entertainer {
      }
      .athlete {
        background-color: #cfd8dc;
      }
      .creator {
        background-color: #d7ccc8;
      }
    }
    th {
      border: 1px solid black;
      background-color: #00796b;
      color: white;
      height: 20px;
      padding: 5px;
    }
    td {
      border: 1px solid black;
      padding: 5px;
    }
    a {
      text-decoration: none;
      color: black;
    }
  }
`;

const DonationEvent = ({ match }) => {
  const { eventname } = match.params;
  const [eventData, setEventData] = useState('');

  useEffect(() => {
    console.log(`############로드데이터########`);
    async function getEventData() {
      try {
        let resEventData = await db
          .collection('stats')
          .doc(eventname)
          .get();

        setEventData(resEventData.data() || []);
      } catch (error) {
        console.log(error);
      }
    }
    getEventData();
  }, []);

  if (!eventData) {
    return (
      <MainBlock>
        <Header category={''} />
        <div></div>
      </MainBlock>
    );
  }

  if (eventData.length === 0) {
    return (
      <MainBlock>
        <Header category={''} />
        <DonationEventBlock>
          <div>정보가 없습니다.</div>
        </DonationEventBlock>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <Header category={'donation'} />
      <DonationEventBlock>
        <div className="detailTop">
          <div className="nameBlock">
            {eventname === 'covid19' ? '코로나19' : '강원도산불'}
          </div>
          <div className="totalBlock">
            {eventData.total.map((value, idx) => (
              <div key={idx}>
                <img src={`/${value.amountImg}.png`} alt={value.amountImg} />
                <p>
                  {typeof value.amount === 'number'
                    ? numberToText(value.amount)
                    : value.amount}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="detailBtm">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>날짜</th>
                <th>이름</th>
                <th>재단</th>
                <th>금액 및 물품</th>
              </tr>
            </thead>

            <tbody>
              {eventData.list.map((value, idx) => (
                <tr
                  key={idx}
                  className={
                    value.job === 1
                      ? 'entertainer'
                      : value.job === 2
                      ? 'athlete'
                      : 'creator'
                  }
                >
                  <td>{idx + 1}</td>
                  <td>{`${String(value.date).substr(0, 4)}.${String(
                    value.date
                  ).substr(4, 2)}.${String(value.date).substr(6, 2)}`}</td>
                  <td>
                    <a href={`/detail/${value.name}`}>{value.name}</a>
                  </td>
                  <td>{value.org}</td>
                  <td>{numberToText(value.amount) || value.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DonationEventBlock>
    </MainBlock>
  );
};

export default DonationEvent;
