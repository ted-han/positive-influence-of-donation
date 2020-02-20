import React, { Component } from 'react';
import Header from './Header';
import DonationItem from './DonationItem';
import styled from 'styled-components';
import db from '../firebase';
import { getLastMonth } from '../myModule';

const MainBlock = styled.div`
  display: flex;
  background-color: #f9f9f9;
`;

const DonationListBlock = styled.div`
  flex: auto;
  padding-top: 50px;
  padding-bottom: 100px;
  margin-left: 240px;
`;

class DonationList extends Component {
  state = {
    donations: null,
    endAtDate: null,
    loading: false
  };

  loadData = async () => {
    try {
      console.log(`############로드데이터########`);
      let endAt = getLastMonth().to;
      let resDonationData = await db
        .collection('donation')
        .orderBy('date', 'desc')
        .endAt(endAt)
        .get();

      this.setState({
        donations: resDonationData.docs.map(doc => {
          // console.log(doc.id, '=>', doc.data());
          return {
            ...doc.data(),
            id: doc.id
          };
        }),
        endAtDate: endAt
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.loadData();
    window.addEventListener('scroll', this.handleScroll, true);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextProps);
    // console.log(nextState);
    if (nextState.loading) return false;
    return true;
  }

  handleScroll = () => {
    const scrollHeight = document.getElementById('root').scrollHeight;
    const clientHeight = document.getElementById('root').clientHeight;
    const scrollY = window.scrollY;

    // setScroll(scrollY);
    if (scrollHeight - clientHeight - scrollY <= 400 && !this.state.loading) {
      console.log('인피니티');
      this.setState(
        {
          loading: true
        },
        async () => {
          try {
            let fromToDate = getLastMonth(this.state.endAtDate);

            let resDonationData = await db
              .collection('donation')
              .orderBy('date', 'desc')
              .startAfter(fromToDate.from)
              .endAt(fromToDate.to)
              .get();
            let addData = resDonationData.docs.map(doc => {
              return {
                ...doc.data(),
                id: doc.id
              };
            });

            this.setState({
              donations: this.state.donations.concat(addData),
              endAtDate: fromToDate.to
            });
          } catch (error) {
            console.log(error);
          }
          this.setState({
            loading: false
          });
        }
      );
    }
  };

  render() {
    console.log('렌더');
    const { donations } = this.state;
    if (!donations) {
      return (
        <MainBlock>
          <Header category={'donation'} />
          <div></div>
        </MainBlock>
      );
    }

    return (
      <MainBlock onScroll={this.handleScroll}>
        <Header category={'donation'} />
        <DonationListBlock>
          {donations.map(value => {
            // return <div>{value.id}</div>;
            return <DonationItem key={value.id} {...value} />;
          })}
        </DonationListBlock>
      </MainBlock>
    );
  }
}

export default DonationList;
