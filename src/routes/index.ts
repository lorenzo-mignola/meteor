import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const meteorites = await prisma.meteorite.findMany();
	const meteoritesFiltered = meteorites
		.filter(({ mass }) => !!mass && mass > 40_000 && mass < 4_000_000)
		.filter(({ year }) => !!year && new Date(year).getFullYear() > 1800);
	return {
		body: {
			meteorites: meteoritesFiltered
		}
	};
};
