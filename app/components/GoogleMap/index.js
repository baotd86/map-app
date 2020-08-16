import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  withScriptjs,
} from 'react-google-maps';

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyAtsz3a4isKyLsYrDF3olyVEsZ3wUGOHj4&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const addresses = localStorage.getItem('addresses');
      this.setState({
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        markers: JSON.parse(addresses),
        onMapMounted: ref => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          // eslint-disable-next-line no-undef
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            // eslint-disable-next-line react/no-access-state-in-setstate
            this.state.center,
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
        },
      });
    },
  }),
  withGoogleMap,
  withScriptjs,
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    options={{
      fullscreenControl: false,
      mapTypeControl: false,
    }}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      /* eslint-disable-next-line no-undef */
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
    >
      <div style={{ textAlign: `center`, width: `100%`, left: 0 }}>
        <input
          type="text"
          placeholder="Customized your placeholder"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `90%`,
            height: `36px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `18px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            backgroundColor: `#fff`,
          }}
        />
      </div>
    </SearchBox>
    {props.markers.map((marker, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Marker key={index} position={marker.position} title={marker.title} clickable />
    ))}
  </GoogleMap>
));

function MyGoogleMap() {
  return <MyMapComponent isMarkerShown />;
}

export default MyGoogleMap;
