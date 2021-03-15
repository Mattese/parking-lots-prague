import axios from 'axios';
import { DetailCard } from 'components/detailCard/DetailCard';
import React, { useEffect, useMemo, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Parking, ParkingsData } from 'types/types';
import styles from 'styles/pageStyles/firstPage.module.scss';
import MyMap from 'components/myMap/myMap';
import Link from 'next/link';
import { formatDate } from 'functions/date';
import { capitalize } from 'functions/string';
import { DetailCardSkeleton } from 'components/detailCard/DetailCardSkeleton';

const makeCurrentOccupancyDonut = (freePlaces: number, takenPlaces: number) => {
  return freePlaces && takenPlaces ? (
    <Pie
      data={{
        labels: ['Free places', 'Occupied places'],
        datasets: [
          {
            label: 'Parking places',
            data: [freePlaces, takenPlaces],
            backgroundColor: ['green', 'red'],
          },
        ],
      }}
      width={100}
      height={100}
      options={{ maintainAspectRatio: false, responsive: true }}
    />
  ) : (
    <div className={styles.noData}>
      <h2>No data for current occupancy </h2>
    </div>
  );
};

const currentDayIndex = () => {
  return new Date().getDay();
};

const calculateOccupancyForToday = (totalPlaces: number, occupancyForToday) => {
  const percentageArray = occupancyForToday.map((element) => {
    return Math.floor((element / totalPlaces) * 100);
  });
  return percentageArray;
};

const makeOccupancyGraphForThisDayInWeek = (
  occupancyObject: { [key: string]: { [key: string]: number } },
  totalPlaces: number,
) => {
  let occupancyForTodayValues;
  const occupancy = JSON.parse(JSON.stringify(occupancyObject));
  const todayDayIndex = currentDayIndex();
  const isDataForToday = !!occupancy[todayDayIndex];

  if (isDataForToday) {
    occupancyForTodayValues = Object.entries(occupancy[todayDayIndex]).sort();
    calculateOccupancyForToday(
      totalPlaces,
      occupancyForTodayValues.map((t) => t[1]),
    );
  }

  return isDataForToday ? (
    <Line
      data={{
        labels: occupancyForTodayValues.map((t) => t[0]),
        datasets: [
          {
            label: 'Percentage of occupied places through day',
            data: calculateOccupancyForToday(
              totalPlaces,
              occupancyForTodayValues.map((t) => t[1]),
            ),
          },
        ],
      }}
      width={100}
      height={100}
      options={{ maintainAspectRatio: false, responsive: true }}
    />
  ) : (
    <div className={styles.noData}>
      <h2>No data for this day in week </h2>
    </div>
  );
};

const renderParkingInfo = (parkingProperties: Parking['properties']) => {
  return (
    <div className={styles.addressBox}>
      <div className={styles.row}>
        <h2>District</h2>
        <p>{capitalize(parkingProperties.district)}</p>
      </div>
      <div className={styles.row}>
        <h2>Address</h2>
        <p>{capitalize(parkingProperties.address.address_formatted)} </p>
      </div>
      <div className={styles.row}>
        <h2>Last updated</h2>
        <p>{formatDate(parkingProperties.last_updated, 'DD.MM.YYYY, HH.mm')}</p>
      </div>
    </div>
  );
};

function solution(S, K) {
  // write your code in JavaScript (Node.js 8.9.4)
  const dayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayIndex = dayArray.findIndex((day) => day === S);
  const index = dayIndex + K > 6 ? (dayIndex + K) % 7 : dayIndex + K;
  console.log(dayArray[index])
  return dayArray[index];
}

const Index = () => {
  const [parkings, setParkings] = useState<ParkingsData['features']>([]);
  const [loading, setLoading] = useState(false);

  solution('Sat', 23);

  // TODO: Hide API_KEY
  const loadParkingData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('https://api.golemio.cz/v2/parkings/', {
        headers: {
          'x-access-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlaWNobG1Ac2V6bmFtLmN6IiwiaWQiOjY4MywibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjE0OTU5MTUxLCJleHAiOjExNjE0OTU5MTUxLCJpc3MiOiJnb2xlbWlvIiwianRpIjoiMmJlYTFjMzMtYjllMi00MzU3LTg0Y2MtMjNmMTUwYjQ0NDdkIn0.bePD7p4wf3K--ohk38oadTIFE7EmmNNiZfRjeH2tcuA',
        },
      });
      return data;
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadParkingData().then((parkings: ParkingsData) => {
      setParkings(parkings.features);
    });
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.cardWrapper}>
          <DetailCardSkeleton />
          <DetailCardSkeleton />
          <DetailCardSkeleton />
        </div>
      ) : parkings.length > 0 ? (
        <div className={styles.cardWrapper}>
          {parkings.map((parking, index) => (
            <DetailCard
              key={index}
              header={parking.properties.name}
              contentBack={makeCurrentOccupancyDonut(
                parking.properties.num_of_free_places,
                parking.properties.num_of_taken_places,
              )}
              contentFront={makeOccupancyGraphForThisDayInWeek(
                parking.properties.average_occupancy,
                parking.properties.total_num_of_places,
              )}
              middleInfoBox={renderParkingInfo(parking.properties)}
            />
          ))}
        </div>
      ) : (
        'No data available'
      )}
    </>
  );
};
export default Index;

{
  /* <MyMap
        isMarkerShown
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        positions={parkings[0].geometry.coordinates}
      /> */
}
