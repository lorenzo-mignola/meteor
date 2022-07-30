<script lang="ts">
	import type { Meteorite } from '@prisma/client';

	// import { Scatterplot } from '@d3/scatterplot';
	import { onMount } from 'svelte';
	import scatterPlot from '../lib/scatterPlot';

	export let meteorites: Meteorite[];

	const mass = meteorites.map((meteorite) => meteorite.mass);

	let element: HTMLElement;

	// const chart = Scatterplot(meteorites, {
	// 	x: (d: Meteorite) => d.year,
	// 	y: (d: Meteorite) => d.mass,
	// 	title: (d: Meteorite) => d.name,
	// 	xLabel: 'Year',
	// 	yLabel: 'Mass',
	// 	stroke: 'steelblue',
	// 	width: 1200,
	// 	height: 600
	// });

	onMount(() => {
		// console.log(meteorites);

		scatterPlot(element, meteorites || []);

		// // create plot
		// const svg = d3.select(element).append('svg').attr('width', 1200).attr('height', 600);

		// const pointsSize = 5;

		// // add points
		// svg
		// 	.selectAll('circle')
		// 	.data(meteorites)
		// 	.enter()
		// 	.append('circle')
		// 	.attr('cx', (d: Meteorite) => new Date(d.year || 0).getFullYear())
		// 	.attr('cy', (d: Meteorite) => d.mass)
		// 	.attr('r', pointsSize);
		// // .attr('r', (d: Meteorite) => d.mass);

		// // add labels
		// svg
		// 	.selectAll('text')
		// 	.data(meteorites)
		// 	.enter()
		// 	.append('text')
		// 	.attr('x', (d: Meteorite) => new Date(d.year || 0).getFullYear() + pointsSize || pointsSize)
		// 	.attr('y', (d: Meteorite) => d.mass || 0 + pointsSize)
		// 	.text((d: Meteorite) => d.name)
		// 	.attr('font-size', '10px');

		// const years = meteorites.map((m) => new Date(m.year || 0).getFullYear());
		// const masses = meteorites.map((m) => m.mass);

		// const scaleX = d3
		// 	.scaleLinear()
		// 	//@ts-ignore
		// 	.domain([d3.min(years), d3.max(years)])
		// 	.range([0, 1200]);

		// const scaleY = d3
		// 	.scaleLinear()
		// 	//@ts-ignore
		// 	.domain([d3.min(masses), d3.max(masses)])
		// 	.range([600, 0]);

		// const yaxis = d3.axisLeft(scaleY);

		// // Add scales to axis
		// const xaxis = d3.axisBottom(scaleX);

		// //Define X axis

		// svg
		// 	.append('g')
		// 	.attr('class', 'axis')
		// 	.attr('transform', 'translate(0,' + (600 - 5) + ')')
		// 	.call(xaxis);
		// //Create Y axis
		// svg.append('g').attr('transform', 'translate(50, 10)').call(yaxis);
		// // d3.select(element)
		// // 	.selectAll('div')
		// // 	.data(mass)
		// // 	.enter()
		// // 	.append('div')
		// // 	.style('width', function (d) {
		// // 		return d + 'px';
		// // 	})
		// // 	.text(function (d) {
		// // 		return d;
		// // 	});
	});
</script>

<svelte:head>
	<title>Meteorites data</title>
	<meta name="description" content="Meteorites data from NASA" />
</svelte:head>

<div bind:this={element} class="chart" />

<style>
	.chart :global(div) {
		font: 10px sans-serif;
		background-color: steelblue;
		text-align: right;
		padding: 3px;
		margin: 1px;
		color: white;
	}
</style>
