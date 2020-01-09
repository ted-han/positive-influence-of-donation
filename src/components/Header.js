import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
  flex-basis: 240px;
  min-width: 150px;
  h2 {
    color: black;
  }

  ul {
    margin: 0;
    padding: 0;
  }
  li {
    margin: 0;
    padding: 0;
    font-size: 18px;
  }
  li:hover {
    background-color: grey;
  }

  a {
    display: block;
    text-decoration: none;
    padding: 10px 30px;
  }
`;

const ABlock = styled.a`
  color: black;

  ${props =>
    props.active &&
    `
    color: #5f3dc4;
  `};
`;

const Header = ({ category }) => {
  // console.log('category: ' + category);

  return (
    <HeaderBlock>
      <a href="/">
        <h2>기부</h2>
      </a>

      <nav>
        <ul>
          <li key="1">
            <ABlock href="/" active={category === 'donation'}>
              기부내역
            </ABlock>
          </li>
          <li key="2">
            <ABlock href="/detail" active={category === 'detail'}>
              개인상세
            </ABlock>
          </li>
        </ul>
      </nav>
    </HeaderBlock>
  );
};

export default Header;
