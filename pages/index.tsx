import axios from 'axios';
import { DetailCard } from 'components/detailCard/DetailCard';
import { useEffect, useMemo, useState } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Parking, ParkingsData } from 'types/types';

// TODO: Hide API_KEY
const downloadData = async () => {
  try {
    const { data } = await axios.get('https://api.golemio.cz/v2/parkings/', {
      headers: {
        'x-access-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJlaWNobG1Ac2V6bmFtLmN6IiwiaWQiOjY4MywibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjE0OTU5MTUxLCJleHAiOjExNjE0OTU5MTUxLCJpc3MiOiJnb2xlbWlvIiwianRpIjoiMmJlYTFjMzMtYjllMi00MzU3LTg0Y2MtMjNmMTUwYjQ0NDdkIn0.bePD7p4wf3K--ohk38oadTIFE7EmmNNiZfRjeH2tcuA',
      },
    });
    return data;
  } catch (error) {}
};

const makeCurrentOccupancyDonut = (freePlaces: number, takenPlaces: number) => {
  return (
    freePlaces &&
    takenPlaces && (
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
    )
  );
};

const currentDayIndex = () => {
  return new Date().getDay();
};

const calculateOccupancyForToday = (totalPlaces: number, occupancyForToday) => {
  const percentageArray = occupancyForToday.map((element) => Math.floor((element / totalPlaces) * 100));
  return percentageArray;
};

const makeOccupancyGraphForThisDayInWeek = (
  occupancyObject: { [key: string]: { [key: string]: number } },
  totalPlaces: number,
) => {
  const occupancy = JSON.parse(JSON.stringify(occupancyObject));
  const todayDayIndex = currentDayIndex();
  const occupancyForTodayValues = Object.entries(occupancy[todayDayIndex]).sort();
  calculateOccupancyForToday(
    78,
    occupancyForTodayValues.map((t) => t[1]),
  );

  return (
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
  );
};

const Index = () => {
  const [parkings, setParkings] = useState<ParkingsData['features']>([]);

  console.log(parkings, 'parkings');

  useEffect(() => {
    downloadData().then((parkings: ParkingsData) => {
      setParkings(parkings.features);
    });
  }, []);

  return (
    <>
      body
      {parkings?.length > 0 && (
        <DetailCard
          header={parkings[0].properties.name}
          contentBack={makeCurrentOccupancyDonut(
            parkings[0]?.properties?.num_of_free_places,
            parkings[0]?.properties?.num_of_taken_places,
          )}
          contentFront={makeOccupancyGraphForThisDayInWeek(
            parkings[0]?.properties?.average_occupancy,
            parkings[0]?.properties?.num_of_taken_places,
          )}
        />
      )}
    </>
  );
};
export default Index;
