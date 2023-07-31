<script lang="ts">
	import ChartLabel from './chartLabel.svelte';
	import Echart from './echart.svelte';
	export let chartData: any[] = [];

	$: options = {
		tooltip: {
			trigger: 'item'
		},
		color: ['#727792', '#FD9D67'],
		series: [
			{
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 10
				},
				label: {
					show: false,
					position: 'center'
				},
				labelLine: {
					show: false
				},

				data: chartData.map((x) => ({ name: x.name, value: x.count }))
			}
		]
	};

	function sumArray(array: any[]) {
		let sum = 0;
		for (const item of array) {
			sum += item;
		}
		return sum;
	}

	function getPercentage(val: string) {
		if (chartData.length) {
			const total = chartData.reduce(
				(accumulator, currentValue) => accumulator + currentValue.count,
				0
			)
			const index = val === 'Male' ? 0 : val === 'Female' ? 1 : -1;
			if (index !== -1 && chartData[index] !== undefined) {
				// return `${((chartData[index].count / total) * 100).toFixed(0)}%`
				return `${(chartData[index].count / total * 100).toFixed(0)}%`
			}
		}
		return '0%';
	}
</script>

<p class="pl-6 pt-4 text-lg font-medium">Gender Share</p>
<div class=" flex items-center justify-center">
	<Echart {options} />
	<div class="flex flex-col gap-2">
		<ChartLabel label="Male" color="text-[#727792]" count={getPercentage('Male')} />
		<ChartLabel label="Female" color="text-[#FD9D67]" count={getPercentage('Female')} />
	</div>
</div>
