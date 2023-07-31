<script lang="ts">
	import { getAllEmployees } from '$lib/integrations/employees';
	import { onMount } from 'svelte';
	import Datatable, { type TableColumn } from '../../components/Datatable.svelte';
	import Paginate from '../../components/Paginate.svelte';
	import { navBarHeader, activePage } from '../../lib/stores/layoutStore';
	import {
		currentPage,
		pageSize,
		totalPages,
		totalItems,
		nextPage,
		previousPage
	} from '../../lib/stores/paginate';
	import TableSearchBox from '../../components/TableSearchBox.svelte';
	import SideModal from '../../components/SideModal.svelte';

	$navBarHeader = { label: 'Employees', color: 'text-[#E1601F]' };
	$activePage = {
		labels: [{ id: 1, label: 'Employees' }],
		icon: 'fluent:people-48-filled',
		iconColor: 'text-[#E1601F]',
		currentPage: 0,
		buttons: [
			{
				label: 'Add Employee',
				icon: 'ic:round-add',
				iconColor: 'text-[#18536C]',
				onClick: () => (showModal = true)
			}
		]
	};

	const actionButtons = [
		{ label: 'View Pink Sheet', style: 'text-[#1EB5F5] hover:text-blue-500 ' }
	];

	const columns: TableColumn[] = [
		{
			name: 'STAFF ID',
			cell: (row: any) => row.staffId,
			divStyle: 'font-medium px-6'
		},
		{
			name: 'NAME',
			cell: (row: any) => row.fullname,
			divStyle: 'px-6 py-1 text-gray-600 font-medium'
		},
		{
			name: 'CONTACT',
			cell: (row: any) => row.contact,
			divStyle: 'px-6 py-1 text-gray-600 font-medium'
		},
		{
			name: 'EMAIL',
			cell: (row: any) => row.email,
			divStyle: 'px-6 py-1 text-gray-600 font-medium'
		},
		{
			name: 'DEPARTMENT',
			cell: (row: any) => row.deptName,
			divStyle: 'px-6 py-1 text-gray-600 font-medium'
		},
		{
			name: 'STATUS',
			cell: (row: any) => (row.active ? 'Active' : 'Inactive'),
			contentStyle: `${(row: any) =>
				row.active
					? 'bg-green-100'
					: 'bg-orange-100'} font-medium w-24 flex justify-center py-1 rounded-[5px] text-xs`
		}
	];

	let tableData: any[] = [];
	let query = '';
	let showModal = false;

	async function fetchData(currentPage: number, pageSize: number, searchQuery?: string) {
		try {
			const res = await getAllEmployees(currentPage, pageSize, searchQuery);
			const { data, totalCount } = res.data;
			tableData = data;
			totalItems.set(totalCount);
		} catch (err: any) {
			console.log(err);
		}
	}

	onMount(() => {
		fetchData($currentPage, $pageSize);
	});

	onMount(() => {
		fetchData($currentPage, $pageSize);
	});

	function handleNextPage() {
		nextPage();
		fetchData($currentPage, $pageSize, query);
	}

	function handlePrevPage() {
		previousPage();
		fetchData($currentPage, $pageSize, query);
	}

	$: if (query) {
		fetchData($currentPage, $pageSize, query);
	}
</script>

<div class="flex flex-col gap-5">
	<div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
		<TableSearchBox bind:value={query} placeholder="Quick search for anything" />
		<div class="hidden lg:block" />
		<div class="grid md:place-content-end">
			<Paginate
				spreadWide={false}
				hideLabels={true}
				currentPage={$currentPage}
				onPreviousPage={handlePrevPage}
				onNextPage={handleNextPage}
				totalPages={$totalPages}
				hasNextPage={$currentPage !== $totalPages}
				hasPreviousPage={$currentPage !== 1}
			/>
		</div>
	</div>
	<Datatable bodyData={tableData} {columns} headerColor="white" height={670} {actionButtons} />
</div>

<SideModal
	open={!showModal}
	id="employeeSideModal"
	placement="right"
	title="Add Employee"
	close={() => (showModal = false)}
>
module

</SideModal>
