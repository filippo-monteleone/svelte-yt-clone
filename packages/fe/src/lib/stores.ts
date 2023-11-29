import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { myComments } from './types';

let storedSubs: Channel[] = [];
let storedComments: myComments[] = [];
let storedLikedVideos: number[] = [];
const storedMyself: User = { id: 0, username: '', image: '' };

if (browser) {
	storedSubs = JSON.parse(localStorage.getItem('subs') || '[]');
	storedComments = JSON.parse(localStorage.getItem('comments') || '[]');
	storedLikedVideos = JSON.parse(localStorage.getItem('likes') || '[]');
}

export const subs = writable<Channel[]>(storedSubs || []);
export const commentedVideo = writable<myComments[]>(storedComments || []);
export const likedVideos = writable<number[]>(storedLikedVideos || []);
export const me = writable<User>(storedMyself);
export const showLoginStore = writable<boolean>(false);

if (browser) {
	subs.subscribe((value) => localStorage.setItem('subs', JSON.stringify(value)));
	likedVideos.subscribe((value) => localStorage.setItem('likes', JSON.stringify(value)));
}
