import { Geolocation, Meteorite } from '@prisma/client';

export type FullMeteorite = Omit<Meteorite, 'geolocationId'> & {
	geolocation: Geolocation;
};
