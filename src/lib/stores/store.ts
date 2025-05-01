import { writable } from 'svelte/store';

export const isNavShowed = writable<boolean>(false);

export const toggleNav = (): void => {
    isNavShowed.update(s => !s);
}
