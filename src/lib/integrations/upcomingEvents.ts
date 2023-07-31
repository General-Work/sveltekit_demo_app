export interface IEvent {
	id: string;
	title: string;
	startTime: Date;
	startDate: Date;
}

let events: IEvent[] = [
	{ id: '01', title: 'Event 1', startDate: new Date(), startTime: new Date() },
	{ id: '02', title: 'Event 2', startDate: new Date(), startTime: new Date() },
	{ id: '03', title: 'Event 3', startDate: new Date(), startTime: new Date() },
	{ id: '04', title: 'Event 4', startDate: new Date(), startTime: new Date() }
];

export function getUpComingEvents(): Promise<{
	success: boolean;
	message: string;
	data: IEvent[];
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Success',
				data: events
			});
		}, 1000);
	});
}
