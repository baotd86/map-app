/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { createRef, memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import AddressPage from 'containers/PostAddressPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { MenuContext } from 'contexts/MenuContext';

import { connect } from 'react-redux';
import { compose } from 'redux';
import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

const screenHeight = window.innerHeight;

export function App() {
  const [isHome, setIsHome] = useState(true);
  const [mapHeight, setMapHeight] = useState(`450px`);
  const hRef = React.createRef();

  useEffect(() => {
    setIsHome(true);
  }, [setIsHome]);

  useEffect(() => {
    if (hRef.current) {
      const headerH = hRef.current.clientHeight;
      setMapHeight(`${screenHeight - headerH}px`);
      console.log(mapHeight);
    }
  });

  return (
    <MenuContext.Provider value={[isHome, setIsHome]}>
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="React.js Boilerplate"
        >
          <meta
            name="description"
            content="A React.js Boilerplate application"
          />
        </Helmet>
        <Header ref={hRef} />
        <Switch>
          <Route exact path="/" component={HomePage} mapHeight={mapHeight} />
          <Route path="/post-address" component={AddressPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    </MenuContext.Provider>
  );
}

const mapStateToProps = state => ({
  mapHeight: state.mapHeight,
  isHome: state.isHome,
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(App);
