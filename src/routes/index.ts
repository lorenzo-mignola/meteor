import { PrismaClient } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const prisma = new PrismaClient();

export const GET: RequestHandler = async () => {
	const meteorites = await prisma.meteorite.findMany();
	return {
		body: {
			meteorites
		}
	};
};
