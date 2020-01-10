import React from 'react';
import styled from 'styled-components';
import { numberToText } from '../myModule';
import { Link } from 'react-router-dom';

const DonationItemBlock = styled.div`
  display: flex;
  width: 960px;
  margin: 0 auto;
  padding: 10px 0;
  border-bottom: solid #e6e6e6 1px;
  height: 120px;

  .item-left {
    /* border: solid red 1px; */
    flex: 2;
    display: flex;
    justify-content: center;
    img {
      height: 100%;
      border-radius: 50%;
    }
  }
  .item-center {
    /* border: solid red 1px; */
    flex: 8;
    margin: auto 0;
    p {
      margin-top: 0px;
      margin-bottom: 3px;
    }
    .item-center-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      a {
        text-decoration: none;
        color: black;
        &:hover {
          color: gray;
        }
      }
    }
    .item-center-org {
      font-size: 14px;
      color: #868e96;
      a {
        color: #868e96;
        text-decoration: none;
        &:hover {
          color: black;
        }
      }
    }
    .item-center-hashtag {
      font-size: 14px;
      span {
        color: #868e96;
        margin-right: 4px;
      }
      span:hover {
        background-color: #fab005;
      }
    }
  }

  .item-right {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 18px;
  }

  span {
    color: #e6e6e6;
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
            {obj.name}
            {/* <span>{obj.items || numberToText(obj.amount)}</span> */}
          </Link>
        </p>

        <p className="item-center-org">
          {obj.org} <span>|</span>{' '}
          {`${String(obj.date).substr(2, 2)}.${String(obj.date).substr(
            4,
            2
          )}.${String(obj.date).substr(6, 2)}`}{' '}
          <span>|</span>{' '}
          <a target="_blank" rel="noreferrer noopener" href={obj.link}>
            관련기사
          </a>
        </p>
        <p className="item-center-hashtag">
          {obj.tag.map((value, idx) => (
            <span key={idx}>#{value}</span>
          ))}
        </p>
      </div>
      <div className="item-right">
        <p>{obj.items || numberToText(obj.amount)}</p>
      </div>
    </DonationItemBlock>
  );
};

export default DonationItem;
