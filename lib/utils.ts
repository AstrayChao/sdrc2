import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Repository, RepositoryDocument } from "@/types/repository";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


// 数据源配置
export const SOURCE_CONFIG = {
    re3data: {
        label: "re3data",
        color: "bg-blue-50 text-blue-700 border-blue-200",
        priority: 1
    },
    fairsharing: {
        label: "FAIRsharing",
        color: "bg-green-50 text-green-700 border-green-200",
        priority: 2
    },
    gcbr: {
        label: "GCBR",
        color: "bg-purple-50 text-purple-700 border-purple-200",
        priority: 3
    }
} as const;

// 获取数据源信息
export const getSourceInfo = (source: string) => {
    const normalizedSource = source.toLowerCase();
    return SOURCE_CONFIG[normalizedSource as keyof typeof SOURCE_CONFIG] || {
        label: source,
        color: "bg-gray-50 text-gray-700 border-gray-200",
        priority: 999
    };
};

// 按优先级排序数据源
export const sortSourcesByPriority = (sources: string[]) => {
    return sources.sort((a, b) => {
        const aInfo = getSourceInfo(a);
        const bInfo = getSourceInfo(b);
        return aInfo.priority - bInfo.priority;
    });
};

// 格式化日期
export const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "未知";
    try {
        return new Date(dateString).toLocaleDateString("zh-CN");
    } catch {
        return "未知";
    }
};
export const getAccessTypeLabel = (type: string) => {
    const typeMap: Record<string, string> = {
        open: "开放访问",
        restricted: "限制访问",
        closed: "关闭访问"
    };
    return typeMap[type] || type;
};
export const getAccessTypeBadgeStyle = (type: string) => {
    const styleMap: Record<string, string> = {
        open: "bg-green-50 text-green-700 border-green-200",
        restricted: "bg-orange-50 text-orange-700 border-orange-200",
        closed: "bg-red-50 text-red-700 border-red-200"
    };
    return styleMap[type] || "bg-gray-50 text-gray-700 border-gray-200";
};
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

export function transformRepository(doc: RepositoryDocument): Repository {
    const { _id, ...rest } = doc
    return {
        ...rest,
        id: _id.toString(),
        repositoryName: extractValue<string>(rest.repositoryName) || '',
        description: extractValue<string>(rest.description) || '',
        subject: extractArrayValues<{value: string}>(rest.subject)?.map(s => s.value) || [],
        keyword: extractArrayValues<string>(rest.keyword) || [],
        contentType: extractArrayValues<{value: string}>(rest.contentType)?.map(ct => ct.value) || [],
        additionalName: extractArrayValues<{value: string}>(rest.additionalName)?.map(an => an.value) || [],
        institution: rest.institution?.map(inst => ({
            ...inst,
            institutionName: extractValue<string>(inst.institutionName) || '',
            institutionAdditionalName: extractArrayValues<{
                value: string
            }>(inst.institutionAdditionalName)?.map(ian => ian.value) || []
        })) || [],
        metadataStandard: rest.metadataStandard?.map(ms => ({
            metadataStandardName: extractValue<string>(ms.metadataStandardName) || '',
            metadataStandardURL: ms.metadataStandardURL
        })) || []
    }
}