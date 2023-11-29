export interface User {
	id: number;
	username: string;
	image: string;
}

export interface Channel {
	owner: User;
	subs: number;
	videos?: number;
}

export interface myComments {
	id: number;
	videoId: number;
	comment: string;
}

export interface Video {
	description: string;
	sources: string[];
	subtitle: string;
	thumb: string;
	title: string;
	id: number;
}
