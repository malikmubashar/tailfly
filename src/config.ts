import * as animateCss from './lib/animate-css';
import writer from './utils/obj-writer';
import reader from './utils/obj-reader';
import type { Config } from 'tailwindcss/types/config';

export const CONFIG: Config = {
    content: [],
    theme: {
        extend: {
            keyframes: {
                ...animateCss.keyframes,
            },
            animation: {
                ...animateCss.animations,
            },
            colors: {}
        }
    }
};


export const setter = writer(CONFIG);
export const getter = reader(CONFIG);