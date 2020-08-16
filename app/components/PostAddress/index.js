import React from 'react';
import styled from 'styled-components';
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
  border: none;
  border-radius: 0;
  resize: none;
  font-size: 16px;
  height: 20px;
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

const Btn = styled.button`
  z-index: 999;
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

  const handleClick = () => {
    if (newAddress) {
      addressArr.push(newAddress);
      localStorage.setItem('addresses', JSON.stringify(addressArr));
      // eslint-disable-next-line prettier/prettier
      const searchInput = document.getElementById('react-google-places-autocomplete-input');
      searchInput.value = '';
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
          <TxtArea id="prop_note" placeholder="Enter any note here" />
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
