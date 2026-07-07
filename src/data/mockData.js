// Mock domain data for the fleet dashboard.

export const fleets = [
  { id: 'f1', name: 'Dhaka Metro Fleet', owner: 'Karim Owner', vehicles: 24, drivers: 20, city: 'Dhaka', status: 'active' },
  { id: 'f2', name: 'Chittagong Cargo', owner: 'Rahim Trans', vehicles: 15, drivers: 13, city: 'Chittagong', status: 'active' },
  { id: 'f3', name: 'Sylhet Express', owner: 'Nadia Logistics', vehicles: 9, drivers: 8, city: 'Sylhet', status: 'inactive' },
]

export const vehicles = [
  { id: 'v1', fleetId: 'f1', plate: 'DHK-1023', model: 'Tata LPT', status: 'on_trip', driver: 'Jamal Uddin' },
  { id: 'v2', fleetId: 'f1', plate: 'DHK-2288', model: 'Ashok Leyland', status: 'idle', driver: 'Sohel Rana' },
  { id: 'v3', fleetId: 'f1', plate: 'DHK-4510', model: 'Isuzu NPR', status: 'maintenance', driver: '—' },
  { id: 'v4', fleetId: 'f2', plate: 'CTG-7781', model: 'Hino 300', status: 'on_trip', driver: 'Babul Mia' },
]

export const drivers = [
  { id: 'd1', fleetId: 'f1', name: 'Jamal Uddin', license: 'DL-99213', phone: '01711-000001', status: 'on_trip' },
  { id: 'd2', fleetId: 'f1', name: 'Sohel Rana', license: 'DL-88120', phone: '01711-000002', status: 'available' },
  { id: 'd3', fleetId: 'f1', name: 'Rasel Khan', license: 'DL-77341', phone: '01711-000003', status: 'off_duty' },
  { id: 'd4', fleetId: 'f2', name: 'Babul Mia', license: 'DL-66512', phone: '01711-000004', status: 'on_trip' },
]

// Richer driver records for the Driver Directory page (fleet owner view).
export const driverDirectory = [
  {
    id: 'dd1',
    name: 'Marcus Chen',
    employeeId: 'ASM-8821',
    photo: '/driver-marcus.jpg',
    licenseStatus: 'valid',
    riskLevel: 'low',
    dispatches: 1422,
    joinedDate: 'Mar 3, 2020',
    email: 'm.chen@asman.org',
    licenseNumber: 'TX-1188-KL',
    licenseExpiration: 'May 2, 2027',
  },
  {
    id: 'dd2',
    name: 'Elena Rodriguez',
    employeeId: 'ASM-9042',
    photo: '/driver-elena.jpg',
    licenseStatus: 'expiring',
    riskLevel: 'high',
    dispatches: 894,
    joinedDate: 'Jan 12, 2021',
    email: 'e.rodriguez@asman.org',
    licenseNumber: 'TX-8821-ZM',
    licenseExpiration: 'Oct 14, 2026',
  },
  {
    id: 'dd3',
    name: 'James Wilson',
    employeeId: 'ASM-7712',
    photo: '/driver-james.jpg',
    licenseStatus: 'pending',
    riskLevel: 'med',
    dispatches: 312,
    joinedDate: 'Jul 21, 2023',
    email: 'j.wilson@asman.org',
    licenseNumber: 'TX-7712-QN',
    licenseExpiration: 'Feb 9, 2028',
  },
  {
    id: 'dd4',
    name: 'Sarah Jenkins',
    employeeId: 'ASM-4451',
    photo: '/driver-sarah.jpg',
    licenseStatus: 'valid',
    riskLevel: 'low',
    dispatches: 2104,
    joinedDate: 'Sep 18, 2018',
    email: 's.jenkins@asman.org',
    licenseNumber: 'TX-4451-BR',
    licenseExpiration: 'Dec 30, 2026',
  },
]

export const users = [
  { id: 'u1', name: 'Asman Admin', email: 'admin@asman.com', role: 'super_admin', fleet: '—' },
  { id: 'u2', name: 'Karim Owner', email: 'owner@asman.com', role: 'fleet_owner', fleet: 'Dhaka Metro Fleet' },
  { id: 'u3', name: 'Rahim Trans', email: 'rahim@asman.com', role: 'fleet_owner', fleet: 'Chittagong Cargo' },
]

// Helpers scoped to a fleet (used by the Fleet Owner views).
export const vehiclesByFleet = (fleetId) => vehicles.filter((v) => v.fleetId === fleetId)
export const driversByFleet = (fleetId) => drivers.filter((d) => d.fleetId === fleetId)
export const fleetById = (fleetId) => fleets.find((f) => f.id === fleetId)
