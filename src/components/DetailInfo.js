import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from './Header';
import { numberToText } from '../myModule';

import db from '../firebase';

const MainBlock = styled.div`
  display: flex;
  background-color: #f9f9f9;
`;

const DetailInfoBlock = styled.div`
  flex: auto;
  padding: 40px 160px 80px;
  min-width: 800px;
  margin-left: 240px;

  .detailTop {
    text-align: center;
    padding-bottom: 40px;
    .imgBlock {
      margin: 0 auto;
      width: 160px;
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .nameBlock {
      margin-top: 16px;
      font-size: 32px;
      /* font-weight: bold; */
    }
    .totalBlock {
      font-size: 24px;
      /* font-weight: bold; */
    }
  }

  .detailBtm {
    text-align: center;

    table {
      width: 100%;
      border: 1px solid black;
      border-collapse: collapse;
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

const DetailInfo = ({ match }) => {
  const { name } = match.params;
  // console.log('name: ' + name);

  const [detailData, setDetailData] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [items, setItems] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (name) {
      console.log(`############로드데이터########`);
      async function getDetailData() {
        try {
          let sumAmount = 0;
          let checkItems = false;
          let resDetailData;
          let donationRef = db.collection('donation');
          resDetailData = await donationRef
            .where('name', '==', name)
            .where('date', '>=', 20190101)
            .orderBy('date', 'desc')
            .get();

          setDetailData(
            resDetailData.docs.map(doc => {
              // console.log(doc.id, '=>', doc.data());
              sumAmount += doc.data().amount;
              if (doc.data().items) {
                checkItems = true;
              }
              return {
                ...doc.data(),
                id: doc.id
              };
            })
          );
          setTotalAmount(sumAmount);
          setItems(checkItems);
          // console.log(detailData);
        } catch (error) {
          console.log(error);
        }
        setLoading(true);
      }
      getDetailData();
    }
  }, []);

  if (!loading) {
    return (
      <MainBlock>
        <Header category={''} />
        <div></div>
      </MainBlock>
    );
  }

  if (detailData.length === 0) {
    return (
      <MainBlock>
        <Header category={''} />
        <DetailInfoBlock>
          <div>정보가 없습니다.</div>
        </DetailInfoBlock>
      </MainBlock>
    );
  }

  return (
    <MainBlock>
      <Header category={'people'} />
      <DetailInfoBlock>
        <div className="detailTop">
          <div className="imgBlock">
            <img src={detailData[0].img} alt="사진" />
          </div>
          <div className="nameBlock">{detailData[0].name}</div>
          <div className="totalBlock">
            {items
              ? totalAmount
                ? numberToText(totalAmount) + ' + 기타'
                : '기부활동'
              : numberToText(totalAmount)}
          </div>
        </div>
        <div className="detailBtm">
          <table>
            <thead>
              <tr>
                <th>날짜</th>
                <th>재단</th>
                <th>금액 및 물품</th>
                <th>태그</th>
                <th>관련기사</th>
              </tr>
            </thead>
            <tbody>
              {detailData.map(value => (
                <tr key={value.id}>
                  <td>{`${String(value.date).substr(0, 4)}.${String(
                    value.date
                  ).substr(4, 2)}.${String(value.date).substr(6, 2)}`}</td>
                  <td>{value.org}</td>
                  <td>
                    {value.items} {numberToText(value.amount)}
                  </td>
                  <td>{value.tag.join(', ')}</td>
                  <td>
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      href={value.link}
                    >
                      보기
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DetailInfoBlock>
    </MainBlock>
  );
};

export default DetailInfo;
