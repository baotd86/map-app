import React from 'react';
import styled from 'styled-components';
import RightList from './RightList';

const Wrapper = styled.div`
  .navbar {
    font-size: 18px;
    background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
`;

function RightMenu() {
  return (
    <Wrapper>
      <span className="navbar-toggle" id="js-navbar-toggle">
        <i className="material-icons">subject </i>
      </span>
      <RightList />
    </Wrapper>
  );
}

export default RightMenu;
