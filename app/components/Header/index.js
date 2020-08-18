import React, { useEffect } from 'react';

import Media from 'react-media';
import LeftMenu from 'components/Header/LeftMenu';
import { Link } from 'react-router-dom';
import { PAGE_URL } from 'configs/constants';
import RightList from 'components/Header/RightList';
import styled from 'styled-components';

const Wrapper = styled.div`
  .navbar {
    font-size: 18px;
    background-color: red;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    z-index: 999;
  }
  .top-logo {
    a {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
  i.material-icons {
    font-size: 30px;
  }
`;

const Header = React.forwardRef((props, ref) => {
  // const hRef = React.createRef()
  // useEffect(() => {
  //   console.log(ref);
  // });

  return (
    <Wrapper id="header" ref={ref}>
      <nav className="navbar">
        <Media query="(max-width: 599px)" render={() => <LeftMenu />} />
        <div className="top-logo">
          <Link to={PAGE_URL.HOME}>LOGO</Link>
        </div>
        <RightList />
      </nav>
    </Wrapper>
  );
});

export default Header;
