/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { useEffect, memo, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import GoogleMap from 'components/GoogleMap/Loadable';
import { MenuContext } from 'contexts/MenuContext';
import { PAGE_URL } from 'configs/constants';
import { Link } from 'react-router-dom';
import { loadRepos } from '../App/actions';
import { changeUsername } from './actions';
import { makeSelectUsername } from './selectors';
import reducer from './reducer';
import saga from './saga';

const key = 'home';
const screenHeight = window.innerHeight;
const MapArea = styled.div`
  min-height: 400px;
  display: flex;
  flex-direction: column;
`;
const Btn = styled.button`
  z-index: 999;
  bottom: 30px;
  position: absolute;
  height: 36px;
  border: none;
  background: red;
  color: #fff;
  width: 150px;
  border-radius: 18px;
`;

const PostAdDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  a {
    z-index: 999;
    bottom: 30px;
    position: absolute;
    height: 36px;
    border: none;
    background: red;
    color: #fff;
    width: 150px;
    border-radius: 18px;
    text-align: center;
    line-height: 36px;
  }
`;

export function HomePage({ username, onSubmitForm }) {
  const mapRef = useRef(true);
  const [isHome, setIsHome] = useContext(MenuContext);
  console.log(setIsHome);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useEffect(() => {
    setIsHome(true);
  }, [setIsHome]);
  useEffect(() => {
    if (username && username.trim().length > 0) {
      onSubmitForm();
    }
    if (mapRef.current) {
      const { offsetTop } = mapRef.current;
      mapRef.current.style.height = `${screenHeight - offsetTop}px`;
    }
  });

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="Map Page" />
      </Helmet>
      <MapArea ref={mapRef}>
        <GoogleMap />
        <PostAdDiv>
          <Link to={PAGE_URL.ADD_ADDRESS}>POST YOUR AD</Link>
        </PostAdDiv>
      </MapArea>
    </article>
  );
}

HomePage.propTypes = {
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
