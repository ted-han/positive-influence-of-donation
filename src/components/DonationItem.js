import React from 'react';
import styled from 'styled-components';
import { numberToText } from '../myModule';
import { Link } from 'react-router-dom';

const DonationItemBlock = styled.div`
  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 20px 0;
  border-bottom: solid #e6e6e6 1px;

  .item-left {
    padding: 10px 0;
    flex: 2;
    img {
      border-radius: 50%;
    }
  }
  .item-center {
    flex: 8;
    a {
      text-decoration: none;
      color: black;
    }
    p {
      margin-top: 0px;
      margin-bottom: 5px;
      line-height: 30px;
    }
    .item-center-name {
      margin-top: 20px;
      font-size: 30px;
      font-weight: bold;
      span {
        font-size: 20px;
        font-weight: normal;
      }
    }
    .item-center-amount {
      font-size: 20px;
    }
    .item-center-org {
    }
    .item-center-hashtag {
      span {
        background-color: #ebebeb;
        /* cursor: pointer; */
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
        <p className="item-center-name">
          <Link
            to={{
              pathname: '/detail/' + obj.name
            }}
          >
            {obj.name} <span>{obj.items || numberToText(obj.amount)}</span>
          </Link>
        </p>
        {/* <p className="item-center-amount">
          {obj.items || numberToText(obj.amount)}
        </p> */}
        <br />
        <p className="item-center-org">{obj.org}</p>
        <p className="item-center-hashtag">
          {obj.tag.map((value, idx) => (
            <span key={idx}>#{value}</span>
          ))}
        </p>
      </div>
      <div className="item-right">
        <p>
          <a target="_blank" rel="noreferrer noopener" href={obj.link}>
            관련기사보기
          </a>
        </p>
        <div className="item-center-date">{`${String(obj.date).substr(
          0,
          4
        )}-${String(obj.date).substr(4, 2)}-${String(obj.date).substr(
          6,
          2
        )}`}</div>
      </div>
    </DonationItemBlock>
  );
};

export default DonationItem;
