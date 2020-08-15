import React, { useContext } from 'react';
import styled from 'styled-components';
import { MenuContext } from 'contexts/MenuContext';
import { PAGE_URL } from 'configs/constants';
import { Link } from 'react-router-dom';

const Wrapper = styled.div``;

function LeftMenu() {
  const [isHome] = useContext(MenuContext);
  return (
    <Wrapper>
      <Link to={PAGE_URL.HOME}><i className="material-icons">{isHome? `sort` : `arrow_back`}</i></Link>
    </Wrapper>
  );
}

export default LeftMenu;
