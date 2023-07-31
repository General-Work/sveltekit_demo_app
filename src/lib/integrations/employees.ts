export interface IEmployee {
	id: string;
	fullname: string;
	firstname: string;
	surname: string;
	othernames: string;
	deptName: string;
	deptId: string;
	initials: string;
	gender: string;
	active: boolean;
	onLeave: boolean;
	dob: Date;
	IdNumber: string;
	staffId: string;
	email: string;
	contact: string;
}

function generateRandomEmployeeData(): IEmployee {
	const genders = ['Male', 'Female'];
	const departments = ['Sales', 'Marketing', 'Finance', 'HR', 'IT', 'Operations', 'Engineering'];
	const randomGender = genders[Math.floor(Math.random() * genders.length)];
	const randomDept = departments[Math.floor(Math.random() * departments.length)];
	const randomActive = Math.random() < 0.5; // Randomly generate true or false for active status
	const randomOnLeave = Math.random() < 0.3; // Randomly generate true or false for onLeave status

	const randomId = Math.random().toString(36).substring(7); // Generate random ID
	const randomFirstName = `FirstName${Math.floor(Math.random() * 100)}`;
	const randomSurname = `Surname${Math.floor(Math.random() * 100)}`;
	const randomOtherNames = `OtherNames${Math.floor(Math.random() * 100)}`;
	const randomInitials = `${randomFirstName.charAt(0)}${randomSurname.charAt(0)}`;
	const randomDOB = new Date(
		1970 + Math.floor(Math.random() * 30),
		Math.floor(Math.random() * 12),
		Math.floor(Math.random() * 28)
	); // Random date of birth
	const randomIdNumber = Math.random().toString(36).substring(7);
	const randomStaffId = `DemoApp${Math.floor(Math.random() * 10000)}`;
	const randomEmail = `employee${Math.floor(Math.random() * 100)}@example.com`;
	const randomContact = `+1${Math.floor(Math.random() * 1000000000)}`;

	const employee: IEmployee = {
		id: randomId,
		fullname: `${randomFirstName} ${randomSurname} ${randomOtherNames ?? ''}`,
		firstname: randomFirstName,
		surname: randomSurname,
		othernames: randomOtherNames,
		deptName: randomDept,
		deptId: Math.random().toString(36).substring(7),
		initials: randomInitials,
		gender: randomGender,
		active: randomActive,
		onLeave: randomOnLeave,
		dob: randomDOB,
		IdNumber: randomIdNumber,
		staffId: randomStaffId,
		email: randomEmail,
		contact: randomContact
	};

	return employee;
}

// Generate an array of 200 random employees
let employees: IEmployee[] = [];
for (let i = 0; i < 350; i++) {
	employees.push(generateRandomEmployeeData());
}

export function staffDashBoardData(): Promise<{
	success: boolean;
	message: string;
	data: any;
}> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				message: 'Success',
				data: [
					{
						totalStaff: employees.length,
						activeStaff: employees.filter((x) => x.active).length,
						onLeave: employees.filter((x) => x.onLeave).length,
						gender: [
							{ name: 'Male', count: employees.filter((x) => x.gender === 'Male').length },
							{ name: 'Female', count: employees.filter((x) => x.gender === 'Female').length }
						]
					}
				]
			});
		}, 1000);
	});
}

export function getAllEmployees(
	page: number,
	pageSize: number,
	searchQuery?: string
): Promise<{
	success: boolean;
	message: string;
	data: { data: IEmployee[]; totalCount: number };
}> {
	return new Promise((resolve) => {
		let data = employees;

		if (searchQuery) {
			data = employees.filter(
				(person) =>
					person.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
					person.staffId.toLowerCase().includes(searchQuery.toLowerCase())
				// person..toLowerCase().includes(searchQuery.toLowerCase())
			);
		}

		const totalCount = employees.length;
		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;

		const paginatedData = data.slice(startIndex, endIndex);

		resolve({
			success: true,
			message: 'Success',
			data: { data: paginatedData, totalCount: totalCount }
		});
	});
}
