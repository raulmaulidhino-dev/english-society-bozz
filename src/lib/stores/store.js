import { writable } from 'svelte/store';

export const isNavShowed = writable(false);

export const toggleNav = () => {
    isNavShowed.update(s => !s);
}