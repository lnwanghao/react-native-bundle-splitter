import { PreLoadable } from './interface';
import { isCached } from './map';
declare const register: (component: PreLoadable) => any;
declare const preload: () => {
    component: (name: string) => Promise<unknown>;
    group: (name: string) => Promise<unknown[]>;
};
export { register, preload, isCached };
