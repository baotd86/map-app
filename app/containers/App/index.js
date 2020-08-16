/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import AddressPage from 'containers/PostAddressPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { MenuContext } from 'contexts/MenuContext';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`;

export default function App() {
  const [isHome, setIsHome] = useState(true);
  useEffect(() => {
    setIsHome(true);
  }, [setIsHome]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtsz3a4isKyLsYrDF3olyVEsZ3wUGOHj4&callback=initMap&libraries=geometry,drawing,places';
    script.defer = true;

    // Attach your callback function to the `window` object
    window.initMap = () => {
      // JS API is loaded and available
    };
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
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/post-address" component={AddressPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </AppWrapper>
    </MenuContext.Provider>
  );
}
