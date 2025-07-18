import type { Repository, RepositoryDocument } from "@/types/repository";

// 提取值的辅助函数
function extractValue<T>(field: T | {value: T} | undefined): T | undefined {
    if (!field) return undefined;
    if (typeof field === "object" && "value" in field) {
        return (field as {value: T}).value;
    }
    return field as T;
}

// 提取数组值的辅助函数
function extractArrayValues<T>(
    array: Array<T | {value: T} | null | undefined> | null | undefined
): T[] | undefined {
    if (!array) return undefined;

    const result: T[] = [];
    for (const item of array) {
        if (item === null || item === undefined) continue;

        if (typeof item === "object" && "value" in item) {
            result.push((item as {value: T}).value);
        } else {
            result.push(item as T);
        }
    }

    return result.length > 0 ? result : undefined;
}

// 转换单个仓库文档
export function transformRepository(doc: RepositoryDocument): Repository {
    const { _id, ...rest } = doc;

    return {
        ...rest,
        id: _id.toString(),
        repositoryName: extractValue<string>(rest.repositoryName) || "",
        description: extractValue<string>(rest.description) || "",
        subject: extractArrayValues<string>(
            rest.subject?.map(s =>
                typeof s === "object" && "value" in s ? s.value : s
            )
        ),
        keyword: extractArrayValues<string>(rest.keyword),
        contentType: extractArrayValues<string>(
            rest.contentType?.map(ct =>
                typeof ct === "object" && "value" in ct ? ct.value : ct
            )
        ),
        additionalName: extractArrayValues<string>(
            rest.additionalName?.map(an =>
                typeof an === "object" && "value" in an ? an.value : an
            )
        ),
        institution: rest.institution?.map(inst => ({
            ...inst,
            institutionName: extractValue<string>(inst.institutionName) || "",
            institutionAdditionalName: extractArrayValues<string>(
                inst.institutionAdditionalName?.map(ian =>
                    typeof ian === "object" && "value" in ian ? ian.value : ian
                )
            ),
        })),
        metadataStandard: rest.metadataStandard?.map(ms => ({
            metadataStandardName: typeof ms.metadataStandardName === "object"
                ? ms.metadataStandardName.value
                : ms.metadataStandardName,
            metadataStandardURL: ms.metadataStandardURL,
        })),
    };
}

// 批量转换仓库文档
export function transformRepositories(docs: RepositoryDocument[]): Repository[] {
    return docs.map(transformRepository);
}

