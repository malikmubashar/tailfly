import writer from '../utils/obj-writer';

export const StaticVariants: { [key: string]: string | string[] } = {};
export const DynamicVariants = {};

export const setStaticVariants = writer(StaticVariants);
export const setDynamicVariants = writer(DynamicVariants);

