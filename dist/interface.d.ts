import * as React from 'react';
export declare type PreLoadable = {
    name?: string;
    require: () => ({});
    func?: boolean;
    group?: string;
    static?: object;
};
export declare type EnhancedPreLoadable = {
    cached: boolean;
    placeholder: React.ElementType | null;
    extract: string;
};
export declare type Component = PreLoadable & EnhancedPreLoadable & {
    name: string;
};
