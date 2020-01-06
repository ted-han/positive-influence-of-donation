import React from 'react';
import styled from 'styled-components';

const DonationItemBlock = styled.div`
  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;
  border-bottom: solid black 1px;

  .item-left {
    padding: 10px 0;
    flex: 2;
    img {
      border-radius: 50%;
    }
  }
  .item-center {
    flex: 8;

    p {
      margin-top: 0px;
      margin-bottom: 5px;
      line-height: 30px;
    }
    .item-center-name {
      margin-top: 20px;
      font-size: 30px;
      font-weight: bold;
    }
    .item-center-amount {
      font-size: 20px;
    }
    .item-center-org {
    }
    .item-center-hashtag {
      span {
        background-color: #868e96;
        cursor: pointer;
        margin-right: 7px;
        padding: 1px;
      }
      span:hover {
        background-color: #fab005;
      }
    }
  }

  .item-right {
    flex: 2;
    text-align: right;
    position: relative;
    margin-bottom: 5px;
    .item-center-date {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
`;

const DonationItem = obj => {
  return (
    <DonationItemBlock>
      <div className="item-left">
        <img src={obj.img} alt={obj.name} />
      </div>
      <div className="item-center">
        <p className="item-center-name">{obj.name}</p>
        <p className="item-center-amount">{obj.amount}원</p>
        <p className="item-center-org">{obj.org}</p>
        <p className="item-center-hashtag">
          <span>#여성</span> <span>#교육</span>
        </p>
      </div>
      <div className="item-right">
        <p>
          <a href={obj.link} target="_blank">
            관련기사보기
          </a>
        </p>
        <div className="item-center-date">{obj.date}</div>
      </div>
    </DonationItemBlock>
  );
};

export default DonationItem;
