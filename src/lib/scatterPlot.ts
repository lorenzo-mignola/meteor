import type { Meteorite } from '@prisma/client';
import * as d3 from 'd3';

const pointsSize = 5;
const width = 1200;
const height = 600;

const scalePositionY = (max: number) => (mass: number) => (mass / max) * height;
const scalePositionX = (max: number) => (year: number) => (year / max) * width;

const crateSvgArea = (element: HTMLElement) =>
	d3.select(element).append('svg').attr('width', width).attr('height', height);

const addPoints = (
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	meteorites: Meteorite[],
	scaleX: (year: number) => number,
	scaleY: (mass: number) => number
) =>
	svg
		.selectAll('circle')
		.data(meteorites)
		.enter()
		.append('circle')
		.attr('cx', (d: Meteorite) => scaleX(new Date(d.year || 0).getFullYear()))
		.attr('cy', (d: Meteorite) => scaleY(d.mass || 0))
		.attr('r', pointsSize);

const addLabels = (
	svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
	meteorites: Meteorite[],
	scaleX: (year: number) => number,
	scaleY: (mass: number) => number
) =>
	svg
		.selectAll('text')
		.data(meteorites)
		.enter()
		.append('text')
		.attr(
			'x',
			(d: Meteorite) => scaleX(new Date(d.year || 0).getFullYear()) + pointsSize || pointsSize
		)
		.attr('y', (d: Meteorite) => scaleY(d.mass || 0) + pointsSize)
		.text((d: Meteorite) => d.name)
		.attr('font-size', '10px');

const getScale = (values: number[], range: [number, number]) =>
	d3
		.scaleLinear()
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		.domain([d3.min(values), d3.max(values)])
		.range(range);

const addXAxis = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, years: number[]) => {
	const xaxis = d3.axisBottom(getScale(years, [0, width]));

	svg
		.append('g')
		.attr('class', 'axis')
		.attr('transform', 'translate(60,' + (600 - 20) + ')')
		.call(xaxis);
};

const addYAxis = (svg: d3.Selection<SVGSVGElement, unknown, null, undefined>, masses: number[]) => {
	const yaxis = d3.axisLeft(getScale(masses, [height, 0]));

	svg.append('g').attr('transform', 'translate(60, -20)').call(yaxis);
};

const scatterPlot = (element: HTMLElement, meteorites: Meteorite[]) => {
	const masses = meteorites.map((m) => m.mass || 0);
	const years = meteorites.map((m) => new Date(m.year || 0).getFullYear());
	const maxMass = Math.max(...masses);
	const maxYear = Math.max(...years);
	const scaleMass = scalePositionY(maxMass);
	const scaleYear = scalePositionX(maxYear);
	const massScaled = meteorites.map((m) => scaleMass(m.mass || 0));
	console.log('clg -> scatterPlot -> massScaled', { masses, massScaled, years });

	const svg = crateSvgArea(element);

	addPoints(svg, meteorites, scaleYear, scaleMass);
	addLabels(svg, meteorites, scaleYear, scaleMass);

	addXAxis(svg, years);
	addYAxis(svg, masses);
};

export default scatterPlot;
