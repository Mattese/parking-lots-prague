import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

interface ComponentProps {
  isMarkerShown?: boolean;
  positions?: number[];
}

const MyMap: React.FC<ComponentProps> = ({ isMarkerShown, positions }) => {
  console.log(positions);
  return (
    <div>
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: 50.093463, lng: 14.447254 }}>
        {isMarkerShown &&
          positions?.map((pos, index) => <Marker key={index} position={{ lat:14, lng: 15 }} />)}
      </GoogleMap>
    </div>
  );
};
export default withScriptjs(withGoogleMap(MyMap));
