<script lang="ts">
	import Box from '../../components/Box.svelte';
	import DepartmentShaere from '../../components/DepartmentShaere.svelte';
	import Widget from '../../components/Widget.svelte';
	import GenderShare from '../../components/genderShare.svelte';
	import UpcomingEvents, { type IActivity } from '../../components/upcomingEvents.svelte';
	import { navBarHeader, activePage } from '../../lib/stores/layoutStore';
	import PageLoader from '../../components/PageLoader.svelte';
	import { onMount } from 'svelte';
	import { getUpComingEvents } from '$lib/integrations/upcomingEvents';
	import { staffDashBoardData } from '$lib/integrations/employees';
	import { getDeptTotalStaff } from '$lib/integrations/department';
	import { slide } from 'svelte/transition';

	$navBarHeader = { label: 'Home', color: 'text-[#18536C]' };
	$activePage = {
		labels: [{ id: 1, label: 'Dashboard' }],
		icon: 'ic:round-dashboard',
		iconColor: 'text-[#49B08A]'
	};

	let isLoading = true;
	let staffTotal = 0;
	let staffActive = 0;
	let leaveStaff = 0;
	let events: IActivity[] = [];
	let departments: any = [];
	let genderShare: any[] = [];

	onMount(async () => {
		try {
			const [eventsRes, empRes, deptRes] = await Promise.all([
				getUpComingEvents(),
				staffDashBoardData(),
				getDeptTotalStaff()
			]);
			const { totalStaff, activeStaff, onLeave, gender } = empRes.data[0];
			events = eventsRes.data.map((x) => ({
				title: x.title,
				startDate: x.startDate,
				startTime: x.startTime
			}));
			staffTotal = totalStaff;
			staffActive = activeStaff;
			(leaveStaff = onLeave), (genderShare = gender);
			departments = deptRes.data;
		} catch (err) {
		} finally {
			isLoading = false;
		}
	});
</script>

{#if isLoading}
	<div class="flex justify-center items-center h-full">
		<PageLoader />
	</div>
{:else}
	<div class=" h-full 2xl:flex 2xl:grid-cols-2 md:grid-cols-2 gap-8" transition:slide>
		<div class="2xl:w-2/3 w-full mb-4">
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
				<Widget
					color="blue"
					label="Total Staff"
					smallIcon="fluent:people-32-filled"
					bigIcon="ic:round-work"
					count={staffTotal}
				/>
				<Widget
					color="red"
					label="Active Staff"
					smallIcon="fluent:people-32-filled"
					bigIcon="ic:round-work"
					count={staffActive}
				/>
				<Widget
					color="green"
					label="Staff on Leave"
					smallIcon="fluent:people-32-filled"
					bigIcon="clarity:date-solid-badged"
					bigIconSize="120"
					count={leaveStaff}
				/>
			</div>
			<div class="flex-auto w-full pt-6">
				<DepartmentShaere data={departments} />
			</div>
		</div>
		<div class="w-full 2xl:w-1/3 h-full">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-4 2xl:grid-cols-1 2xl:gap-6">
				<Box>
					<div class="">
						<GenderShare chartData={genderShare} />
					</div>
				</Box>
				<Box otherClasses="p-8 mb-28 md:mb-0">
					<p class="text-lg font-medium mb-4">Upcoming Events</p>
					<UpcomingEvents activities={events} />
				</Box>
			</div>
		</div>
	</div>
{/if}
