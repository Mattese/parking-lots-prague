export type Parking = {
  geometry: Geometry;
  properties: {
    parking_type: ParkingType;
    id: number;
    name: string;
    num_of_free_places: number;
    num_of_taken_places: number;
    updated_at: string;
    total_num_of_places: number;
    average_occupancy: AverageOccupancy;
    district: string;
    address: Address;
    last_updated: number;
    payment_link: string;
    payment_shortname: string;
  };
  type: string;
};

type Geometry = {
  type: string;
  coordinates: number[];
};

type ParkingType = {
  description: string;
  id: number;
};

type AverageOccupancy = Record<string, Record<string, number>>;

type Address = {
  address_formatted: string;
  street_address: string;
  postal_code: string;
  address_locality: string;
  address_region: string;
  address_country: string;
};

export type ParkingsData = { type: string; features: Parking[] };
