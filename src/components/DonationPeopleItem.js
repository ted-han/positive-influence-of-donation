import React from 'react';
import styled from 'styled-components';
import { numberToText } from '../myModule';

const DonationPeopleItemBlock = styled.div`
  display: flex;
  height: 100px;
  margin: 0 10px 15px 10px;
  /* align-items: center; */
  background-color: white;
  flex: 0 1 270px;
  width: 270px;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #ffe8cc;
  }

  .item-left {
    margin-right: 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
  }
`;

const DonationPeopleItem = ({ obj, onClick }) => {
  return (
    <DonationPeopleItemBlock onClick={() => onClick(obj.name)}>
      <div className="item-left">
        <img src={obj.img} alt={obj.name} />
      </div>
      <div className="item-right">
        <h3>{obj.name}</h3>
        <p>{numberToText(obj.amount) || '기부활동'}</p>
      </div>
    </DonationPeopleItemBlock>
  );
};

export default DonationPeopleItem;
