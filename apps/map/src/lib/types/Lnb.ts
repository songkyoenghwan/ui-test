export interface LnbSubItem {
	link: string;
	h4: string;
}

export interface LnbItem {
	id: string;
	link: string;
	icon: string;
	h3: string;
	sub: LnbSubItem[];
}

export interface LnbGroup {
	h2: string;
	list: LnbItem[];
}

export type Lnblist = LnbGroup[];
