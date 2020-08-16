import React from 'react';
import styled from 'styled-components';
// import GooglePlacesAutocomplete, {
//   geocodeByPlaceId,
//   getLatLng,
// } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';

const PostAdArea = styled.div`
  display: bock;
  padding: 20px 10px;
  #-google-places-suggestions-container {
    z-index: 10;
  }
  #-google-places-suggestions-container > div {
    line-height: 25px;
  }
`;
const AdInput = styled.div``;
const PropInput = styled.input``;
const PropLabel = styled.label`
  font-size: 14px;
  color: #000;
`;
const TxtArea = styled.textarea`
  border: none;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  height: 50px;
  margin-top: 10px;
  background-color: transparent;
  padding: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transition: border 0.3s, -webkit-box-shadow 0.3s;
  transition: border 0.3s, -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s, border 0.3s;
  transition: box-shadow 0.3s, border 0.3s, -webkit-box-shadow 0.3s;
  outline: none;
`;

function PostAddress() {
  return (
    <PostAdArea>
      <div>
        <AdInput>
          <PropLabel className="prop-label" htmlFor="address_input">
            Property Address
          </PropLabel>

        </AdInput>
        <AdInput>
          <PropLabel className="prop-label" htmlFor="prop_title">
            Property Title
          </PropLabel>
          <PropInput
            type="text"
            id="prop_title"
            placeholder="Your property title"
          />
        </AdInput>
        <AdInput>
          <PropLabel className="prop-label" htmlFor="prop_note">
            Describe more about you property
          </PropLabel>
          <TxtArea id="prop_note" placeholder="Enter any note here" />
        </AdInput>
      </div>
    </PostAdArea>
  );
}

export default PostAddress;
