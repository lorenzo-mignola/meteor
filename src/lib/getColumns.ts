import type { Meteorite } from '@prisma/client';

const getX = (data: Meteorite[]) => {
	const years = data.map((meteorite) => new Date(meteorite.year || 0).getFullYear());
	return ['meteorite_x', ...years];
};

const getY = (data: Meteorite[]) => {
	const masses = data.map((meteorite) => meteorite.mass);
	return ['meteorite', ...masses];
};

const getColumns = (data: Meteorite[]) => [getX(data), getY(data)];

export default getColumns;
