<script lang="ts" context="module">
	export interface TableColumn {
		name: string;
		cell: (row: any) => any;
		divStyle?: string;
		contentStyle?: string;
		align?: 'left' | 'center' | 'right';
	}
	interface IButton {
		label?: string;
		icon?: string;
		style?: string;
	}
</script>

<script lang="ts">
	import Icon from '@iconify/svelte';
	import { createEventDispatcher } from 'svelte';

	export let columns: TableColumn[] = [];
	export let bodyData: any[];
	export let headerColor: 'green' | 'orange' | 'white';
	export let actionButtons: IButton[] = [];
	export let height = 400;

	const dispatch = createEventDispatcher();

	const getColumnValue = (row: any, column: any, columnIndex: number) => {
		return column.cell(row);
	};
</script>

<div class="realtive overflow-x-auto" style="height: {height}px">
	<table class="w-full">
		<thead
			class=" sticky top-0"
			class:bg-[#134961]={headerColor === 'green'}
			class:bg-[#CF9B14]={headerColor === 'orange'}
			class:bg-white={headerColor === 'white'}
			class:text-gray-700={headerColor === 'white'}
			class:text-white={headerColor !== 'white'}
			class:border-b-2={headerColor === 'white'}
		>
			<tr>
				{#if columns.length}
					{#each columns as col}
						<th class="px-6 py-2 text-left rtl:text-right whitespace-nowrap font-bold text-sm"
							>{col.name}</th
						>
					{/each}
				{/if}
				{#if actionButtons.length}
					<th class="px-6 py-2 text-left rtl:text-right whitespace-nowrap font-bold text-sm"
						>{actionButtons.length > 1 ? 'ACTIONS' : 'ACTION'}</th
					>
				{/if}
			</tr>
		</thead>
		<tbody class="divide-y">
			{#if bodyData.length}
				{#each bodyData as row}
					<tr>
						{#each columns as column, columnIndex}
							{#if getColumnValue(row, column, columnIndex)?.imageSrc}
								{#if getColumnValue(row, column, columnIndex)}
									<td class="py-2">
										<div
											class="flex items-center gap-3 {column.divStyle}"
											class:alignCenter={column.align === 'center'}
											class:alignLeft={column.align === 'left'}
										>
											{#if getColumnValue(row, column, columnIndex).imageSrc}
												<img
													src={getColumnValue(row, column, columnIndex).imageSrc}
													alt="party logo"
													class="rounded-full h-12 w-12"
												/>
											{/if}
											<div class="mb-0 flex flex-col">
												<p class="font-medium text-sm">
													{getColumnValue(row, column, columnIndex).name}
												</p>
												{#if getColumnValue(row, column, columnIndex).details}
													<p class="font-light text-gray-400 text-xs">
														{getColumnValue(row, column, columnIndex).details}
													</p>
												{/if}
											</div>
										</div>
									</td>
								{/if}
							{:else}
								<td class="py-2 text-sm">
									<div
										class={column.divStyle}
										class:alignCenter={column.align === 'center'}
										class:alignLeft={column.align === 'left'}
									>
										<p class="mb-0 {column.contentStyle}">
											{getColumnValue(row, column, columnIndex)}
										</p>
									</div>
								</td>
							{/if}
						{/each}
						{#if actionButtons.length}
							{#each actionButtons as btn, btnIndex}
								<td class="">
									<div class="flex items-center pl-2 text-center">
										<button
											class="flex items-center text-xs gap-2 justify-center {btn.style}"
											on:click={() => dispatch('buttonClicked', { row, btnIndex })}
										>
											{#if btn.label}
												<span class="">{btn.label}</span>
											{/if}
											{#if btn.icon}
												<Icon icon={btn.icon} />
											{/if}
										</button>
									</div>
								</td>
							{/each}
						{/if}
					</tr>
				{/each}
			{/if}
		</tbody>
	</table>
</div>

<style>
	.alignCenter {
		@apply flex justify-center text-center items-center;
	}
	.alignLeft {
		@apply flex justify-start items-center pl-2;
	}
</style>
