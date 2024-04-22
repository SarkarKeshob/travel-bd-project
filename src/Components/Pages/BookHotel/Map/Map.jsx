import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { TravelContext } from '../../../Context/TravelDetailsContext/TravelDetailsContext';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt } from "react-icons/fa";

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Map = () => {
  const {travelDetails}=useContext(TravelContext);
  const id=useParams().id;
  const selectedPlace=travelDetails.filter(place=>place.id==id);
  console.log(travelDetails,id)
    const defaultProps = {
     
        center: {
          lat: selectedPlace[0]?.latitude,
          lng: selectedPlace[0]?.longitude
        },
        zoom: 11
      };
    return (
        <div >
            <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          lat={selectedPlace[0]?.latitude}
          lng={selectedPlace[0]?.longitude}
          text={<FaMapMarkerAlt  className='text-2xl'/>}
        />
      </GoogleMapReact>
    </div>
        </div>
    );
};
AnyReactComponent.propTypes={
  text:PropTypes.any,
}
export default Map;