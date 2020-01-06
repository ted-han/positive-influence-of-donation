import React, { Component } from 'react';
import Header from './Header';
import DonationItem from './DonationItem';
import styled from 'styled-components';

const MainBlock = styled.div`
  display: flex;
`;

const DonationListBlock = styled.div`
  flex: auto;
  background-color: #f8f9fa;

  .center {
    height: 5em;
    line-height: 5em;
    background-color: black;
    color: white;
    text-align: center;
    font-size: 36px;
  }
`;
const dataArray = [
  {
    id: 1,
    name: '유재석',
    img:
      'https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201808%2F20180828141741978.jpg',
    org: '아름다운 재단',
    amount: 100000000,
    date: '2020.01.01',
    link:
      'https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=106&oid=076&aid=0003514185'
  },
  {
    id: 2,
    name: '유재석',
    img:
      'https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201808%2F20180828141741978.jpg',
    org: '아름다운 재단',
    amount: 60000000,
    date: '2019.01.01',
    link:
      'https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=106&oid=076&aid=0003514185'
  },
  {
    id: 3,
    name: '유재석',
    img:
      'https://search.pstatic.net/common?type=a&size=120x150&quality=95&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2Fportrait%2F201808%2F20180828141741978.jpg',
    org: '아름다운 재단',
    amount: 7000000,
    date: '2020.01.01',
    link:
      'https://news.naver.com/main/read.nhn?mode=LSD&mid=sec&sid1=106&oid=076&aid=0003514185'
  }
];
class DonationList extends Component {
  state = {
    donations: dataArray,
    year: this.props.match.params.year || '2020'
  };

  render() {
    console.log(this.state.year);
    const { donations, year } = this.state;
    return (
      <MainBlock>
        <Header category={'donation'} />
        <DonationListBlock>
          <div className="center">
            <b>12억 8천만원</b>
          </div>
          <div>시간순 금액순</div>

          {donations.map(data => {
            if (year === data.date.substr(0, 4)) {
              return <DonationItem key={data.id} {...data} />;
            }
            return null;
          })}
        </DonationListBlock>
      </MainBlock>
    );
  }
}

export default DonationList;
