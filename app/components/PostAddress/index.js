import React, { useRef } from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from 'react-google-places-autocomplete';
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
const AdInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  i {
    color: #ee6e73;
    font-size: 56px;
    text-align: center;
  }
  p {
    margin-top: 10px;
    text-align: center;
  }

  .post-btn {
    text-align: center;
  }
`;
const PropInput = styled.input``;
const PropLabel = styled.label`
  font-size: 14px;
  color: #000;
  font-weight: bold;
  opacity: 0.75;
`;
const TxtArea = styled.textarea`
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #9e9e9e;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 8px;
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

const Btn = styled.button`
  position: relative;
  height: 36px;
  border: none;
  background: red;
  color: #fff;
  width: 150px;
  border-radius: 18px;
`;
const addressArr = JSON.parse(localStorage.getItem('addresses')) || [];
let newAddress = {};
function PostAddress() {
  const googlePlacesAutocompleteRef = useRef();
  const handleClick = () => {
    if (!isEmpty(newAddress)) {
      addressArr.push(newAddress);
      localStorage.setItem('addresses', JSON.stringify(addressArr));
      googlePlacesAutocompleteRef.current.clearValue();
      newAddress = {};
    }
  };

  return (
    <PostAdArea>
      <div>
        <AdInput>
          <i className="material-icons">insert_photo</i>
          <p>Add a Photo</p>
        </AdInput>
        <AdInput>
          <PropLabel className="prop-label" htmlFor="address_input">
            Property Address
          </PropLabel>
          <GooglePlacesAutocomplete
            id="address_input"
            inputClassName="autocomplete"
            /* eslint-disable-next-line camelcase */
            onSelect={({ place_id }) => {
              geocodeByPlaceId(place_id)
                .then(results => getLatLng(results[0]))
                .then(({ lat, lng }) => {
                  newAddress = { position: { lat, lng }, title: '' };
                })
                .catch(error => console.error(error));
            }}
            placeholder="Canada Street 5555"
            ref={googlePlacesAutocompleteRef}
          />
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
          <TxtArea row="4" id="prop_note" placeholder="Enter any note here" />
        </AdInput>
        <AdInput>
          <div className="post-btn">
            <Btn onClick={handleClick}>POST ADDRESS</Btn>
          </div>
        </AdInput>
      </div>
    </PostAdArea>
  );
}

export default PostAddress;
