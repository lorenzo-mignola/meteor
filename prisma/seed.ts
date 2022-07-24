import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';
import type { FullMeteorite } from './../types/FullMeteorite';

const prisma = new PrismaClient();

interface SeedMeteorite {
	name: string;
	id: string;
	nametype: string;
	recclass: string;
	mass: string;
	fall: string;
	year?: Date;
	reclat: string;
	reclong: string;
	geolocation?: Geolocation;
}

interface Geolocation {
	type: string;
	coordinates: number[];
}

async function main() {
	const rawData = await readFile(new URL('./seed-data.json', import.meta.url));

	const data = JSON.parse(rawData.toString());

	const dataWithInt: FullMeteorite[] = data.map((meteorite: SeedMeteorite) => ({
		...meteorite,
		id: Number(meteorite.id),
		mass: !Number.isNaN(Number(meteorite.mass)) ? Number(meteorite.mass) : null,
		reclat: meteorite.reclat ? Number(meteorite.reclat) : null,
		reclong: meteorite.reclong ? Number(meteorite.reclong) : null,
		year: meteorite.year ? new Date(meteorite.year) : null,
		geolocation: {
			...meteorite.geolocation,
			type: meteorite.geolocation?.type || '',
			coordinates: meteorite.geolocation?.coordinates.map((coord) => Number(coord)) || []
		}
	}));

	const dataToInsert = dataWithInt.map(async (meteorite) => {
		return await prisma.meteorite.upsert({
			where: { id: meteorite.id },
			update: {},
			create: {
				...meteorite,
				geolocation: {
					create: {
						...meteorite.geolocation
					}
				}
			}
		});
	});

	Promise.all(dataToInsert);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
