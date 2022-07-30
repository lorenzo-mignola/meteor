<script lang="ts">
	import type { Meteorite } from '@prisma/client';
	import bb, { scatter } from 'billboard.js';
	import { onMount } from 'svelte';
	import getColumns from '../lib/getColumns';

	export let meteorites: Meteorite[];
	const meteoritesColumns = getColumns(meteorites);

	let element: HTMLElement;

	onMount(() => {
		bb.generate({
			data: {
				xs: {
					meteorite: 'meteorite_x'
				},
				columns: meteoritesColumns,
				type: scatter() // for ESM specify as: scatter()
			},
			axis: {
				x: {
					label: 'Year',
					tick: {
						fit: false
					}
				},
				y: {
					label: 'Mass'
				}
			},
			bindto: element
		});
	});
</script>

<svelte:head>
	<title>Meteorites data</title>
	<meta name="description" content="Meteorites data from NASA" />
</svelte:head>

<div id="chart" />

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
