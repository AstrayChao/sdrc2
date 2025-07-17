import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const transformField = (field: any) => {
    if (!field) return field
    if (typeof field === 'object' && 'value' in field) {
        return field.value
    }
    return field
}

export function extractValue<T>(field: T | {value: T} | undefined): T | undefined {
    if (!field) return undefined;
    if (typeof field === 'object' && 'value' in field) {
        return field.value as T;
    }
    return field as T;
}


export function extractArrayValues<T>(
    array: Array<T | {value: T} | null | undefined> | null | undefined
): T[] | undefined {
    if (!array) return undefined;

    const result: T[] = [];

    for (const item of array) {
        if (item === null || item === undefined) {
            continue;
        }

        if (typeof item === 'object' && 'value' in item) {
            result.push(item.value as T);
        } else {
            result.push(item as T);
        }
    }

    return result;
}