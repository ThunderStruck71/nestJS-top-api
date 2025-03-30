export interface Root {
	arguments: Argument[];
	clusters: any;
	fixes: any;
	found: number;
	items: Item[];
	page: number;
	pages: number;
	per_page: number;
	suggests: any;
}

export interface Argument {
	argument: string;
	cluster_group?: ClusterGroup;
	disable_url: string;
	value: string;
	value_description?: string;
	hex_color?: string;
	metro_type?: string;
}

export interface ClusterGroup {
	id: string;
	name: string;
}

export interface Item {
	accept_incomplete_resumes: boolean;
	address: Address;
	alternate_url: string;
	apply_alternate_url: string;
	area: Area;
	brand_snippet: BrandSnippet;
	branding: Branding;
	contacts: Contacts;
	counters: Counters;
	department: Department;
	employer: Employer;
	has_test: boolean;
	id: string;
	insider_interview: InsiderInterview;
	misleading_vacancy_alert: boolean;
	name: string;
	professional_roles: ProfessionalRole[];
	published_at: string;
	relations: any[];
	response_letter_required: boolean;
	response_url: any;
	salary: Salary;
	salary_range: SalaryRange;
	schedule: Schedule;
	show_logo_in_search: boolean;
	snippet: Snippet;
	sort_point_distance: number;
	type: Type;
	url: string;
}

export interface Address {
	building: string;
	city: string;
	description: string;
	lat: number;
	lng: number;
	metro_stations: MetroStation[];
	street: string;
}

export interface MetroStation {
	lat: number;
	line_id: string;
	line_name: string;
	lng: number;
	station_id: string;
	station_name: string;
}

export interface Area {
	id: string;
	name: string;
	url: string;
}

export interface BrandSnippet {
	background: Background;
	logo: string;
	logo_scalable: LogoScalable;
	logo_xs: string;
	picture: string;
	picture_scalable: PictureScalable;
	picture_xs: string;
}

export interface Background {
	color: any;
	gradient: Gradient;
}

export interface Gradient {
	angle: number;
	color_list: ColorList[];
}

export interface ColorList {
	color: string;
	position: number;
}

export interface LogoScalable {
	default: Default;
	xs: Xs;
}

export interface Default {
	height: number;
	url: string;
	width: number;
}

export interface Xs {
	height: number;
	url: string;
	width: number;
}

export interface PictureScalable {
	default: Default2;
	xs: Xs2;
}

export interface Default2 {
	height: number;
	url: string;
	width: number;
}

export interface Xs2 {
	height: number;
	url: string;
	width: number;
}

export interface Branding {
	tariff: string;
	type: string;
}

export interface Contacts {
	email: string;
	name: string;
	phones: Phone[];
}

export interface Phone {
	city: string;
	comment: any;
	country: string;
	number: string;
}

export interface Counters {
	responses: number;
}

export interface Department {
	id: string;
	name: string;
}

export interface Employer {
	accredited_it_employer: boolean;
	alternate_url: string;
	id: string;
	logo_urls: LogoUrls;
	name: string;
	trusted: boolean;
	url: string;
}

export interface LogoUrls {
	'90': string;
	'240': string;
	original: string;
}

export interface InsiderInterview {
	id: string;
	url: string;
}

export interface ProfessionalRole {
	id: string;
	name: string;
}

export interface Salary {
	currency: string;
	from: number;
	gross: boolean;
	to: any;
}

export interface SalaryRange {
	currency: string;
	frequency: Frequency;
	from: number;
	gross: boolean;
	mode: Mode;
	to: any;
}

export interface Frequency {
	id: string;
	name: string;
}

export interface Mode {
	id: string;
	name: string;
}

export interface Schedule {
	id: string;
	name: string;
}

export interface Snippet {
	requirement: string;
	responsibility: string;
}

export interface Type {
	id: string;
	name: string;
}
