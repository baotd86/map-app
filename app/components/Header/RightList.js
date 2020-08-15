import React from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { PAGE_URL } from 'configs/constants';

const Wrapper = styled.div`
  @media (max-width: 599px) {
    span {
      font-size: 40px;
    }
    .main-nav {
      display: none;
      // display: flex;
      flex-direction: column;
      position: absolute;
      top: 50px;
      width: 100%;
      background-color: red;
      left: 0px;
      li {
        border-top: 1px solid #fff;
        text-align: right;
        a {
          line-height: 32px;
          padding: 0 10px;
        }
      }
    }
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
`;

const Li = styled.li``;

function RightList() {
  return (
    <Wrapper>
      <Media
        query="(max-width: 599px)"
        render={() => (
          <span>
            <i className="material-icons">subject</i>
          </span>
        )}
      />
      <Ul className="main-nav" id="js-menu">
        <Li>
          <Link to={PAGE_URL.HOME}>Home</Link>
        </Li>
        <Li>
          <Link to={PAGE_URL.ADD_ADDRESS}>Add address</Link>
        </Li>
      </Ul>
    </Wrapper>
  );
}

export default RightList;
