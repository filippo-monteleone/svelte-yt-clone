declare global {
	interface User {
		id: number;
		username: string;
		image: string;
	}

	interface Channel {
		owner: User;
		subs: number;
		videos?: number;
		description?: string;
	}

	interface Comment {
		body: string;
		reactions: number;
		user: User;
	}

	interface Video {
		description: string;
		sources: string[];
		subtitle: string;
		thumb: string;
		title: string;
		id: number;
		views: number;
		user: User;
	}
}

export {};
