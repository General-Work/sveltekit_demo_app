export const sideBarMenus = [
	{
		label: 'Dashboard',
		path: '/private/dashboard',
		icon: 'clarity:dashboard-solid-badged',
		iconColor: 'text-[#49B08A]'
	},
	{
		label: 'Employees',
		path: '/private/employee',
		icon: 'fluent:people-48-filled',
		iconColor: 'text-[#E1601F]'
	},
	{
		label: 'Setups',
		icon: 'solar:settings-bold',
		iconColor: 'text-[#E1601F]',
    child: [
      {label: 'Departments'}
    ]
	},
	{
		label: 'Admin',
		path: '/private/admin',
		icon: 'clarity:administrator-solid',
		iconColor: 'text-[#E1601F]',
  
	}
];
