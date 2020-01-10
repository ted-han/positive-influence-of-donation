import React from 'react';
import styled from 'styled-components';

const HeaderBlock = styled.div`
  width: 240px;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  background-color: white;

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

    &:hover {
      background-color: #e6e6e6;
    }
  }
  a {
    display: block;
    text-decoration: none;
    padding: 10px 30px;
  }

  .middle {
    flex: 2;
  }
  .footer {
    flex: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    text-align: center;
    margin-bottom: -10px;
    a {
      text-decoration: none;
      color: #868e96;
    }
  }
`;

const ABlock = styled.a`
  color: black;

  ${props =>
    props.active &&
    `
    color: #fab005;
  `};
`;

const Header = ({ category }) => {
  // console.log('category: ' + category);

  return (
    <HeaderBlock>
      <div>
        <a href="/">
          <h2>선한 영향력</h2>
        </a>

        <nav>
          <ul>
            <li key="1">
              <ABlock href="/" active={category === 'donation'}>
                기부내역
              </ABlock>
            </li>
            <li key="2">
              <ABlock href="/stats" active={category === 'stats'}>
                개인상세
              </ABlock>
            </li>
          </ul>
        </nav>
      </div>

      <div className="middle"></div>
      <div className="footer">
        <h5>
          <a href="/#">메일보내기</a>
        </h5>
        {/* <h5>
          <a href="mailto: htkloveis@gmail.com">메일보내기</a>
        </h5> */}
      </div>
    </HeaderBlock>
  );
};

export default Header;
