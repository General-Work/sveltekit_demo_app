export interface IDepartment {
	name: string;
	id: string;
	staffTotal?: string | number;
}

let departements: IDepartment[] = [
	{ id: '01', name: 'Sales', staffTotal: 120 },
	{ id: '02', name: 'Marketing', staffTotal: 200 },
	{ id: '03', name: 'Finance', staffTotal: 150 },
	{ id: '04', name: 'HR', staffTotal: 80 },
	{ id: '05', name: 'IT', staffTotal: 70 },
	{ id: '06', name: 'Operations', staffTotal: 110 },
	{ id: '07', name: 'Engineering', staffTotal: 130 }
];

export function getDeptTotalStaff(): Promise<{
	success: boolean;
	message: string;
	data: IDepartment[];
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Success',
				data: departements
			});
		}, 1000);
	});
}
