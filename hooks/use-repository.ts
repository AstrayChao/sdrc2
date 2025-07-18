import { useQuery } from "@tanstack/react-query";
import type { Repository } from "@/types/repository";
import { ApiResponse } from "@/lib/api/response";
import { notFound } from "next/navigation";

interface RepositoriesParams {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    page?: number;
    limit?: number;
    from?: string[];
    subjects?: string[];
    countries?: string[];
    contentTypes?: string[];
    accessTypes?: string[];
    institutionTypes?: string[];
    startYear?: string;
    endYear?: string
    hasCertificates?: boolean;
    hasAPI?: boolean;
}

interface RepositoriesResponse {
    repositories: Repository[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

interface RepositoryDetailResponse {
    repository: Repository;
}

export const useRepositories = (params: RepositoriesParams = {}) => {
    const {
        searchTerm = "",
        sortBy = "name",
        sortOrder = "asc",
        page = 1,
        limit = 20,
        from = [],
        subjects = [],
        contentTypes = [],
        accessTypes = [],
        countries = [],
        institutionTypes = [],
        startYear,
        hasCertificates,
        hasAPI,
    } = params;

    return useQuery<ApiResponse<RepositoriesResponse>>({
        queryKey: ["repositories", {
            searchTerm,
            sortBy,
            sortOrder,
            page,
            from,
            subjects,
            contentTypes,
            accessTypes,
            countries,
            institutionTypes,
            startYear,
            hasCertificates,
            hasAPI
        }],
        queryFn: async () => {
            const apiParams = new URLSearchParams();
            if (searchTerm) apiParams.set("q", searchTerm);
            apiParams.set("page", page.toString());
            apiParams.set("limit", limit.toString());
            apiParams.set("sortBy", sortBy);
            apiParams.set("sortOrder", sortOrder);
            if (from.length > 0) apiParams.set("from", from.join(","));
            if (subjects.length > 0) apiParams.set("subjects", subjects.join(","));
            if (contentTypes.length > 0) apiParams.set("contentTypes", contentTypes.join(","));
            if (accessTypes.length > 0) apiParams.set("accessTypes", accessTypes.join(","));
            if (countries.length > 0) apiParams.set("countries", countries.join(","));
            if (institutionTypes.length > 0) apiParams.set("institutionTypes", institutionTypes.join(","));
            if (startYear) apiParams.set("startYear", startYear);
            if (hasCertificates) apiParams.set("hasCertificates", "true");
            if (hasAPI) apiParams.set("hasAPI", "true");
            const res = await fetch(`/api/repositories?${apiParams.toString()}`);
            if (!res.ok) throw new Error("Failed to fetch repositories");
            return res.json();
        },
        staleTime: 5 * 60 * 1000, // 5分钟
        gcTime: 10 * 60 * 1000, // 10分钟
    });
}

// 获取仓库详情
export const useRepositoryDetail = (id: string) => {
    return useQuery<ApiResponse<RepositoryDetailResponse>>({
        queryKey: ["repository", id],
        queryFn: async () => {
            const response = await fetch(`/api/repositories/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    notFound();
                }
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to fetch repository");
            }
            return response.json();
        },
        enabled: !!id,
        staleTime: 5 * 60 * 1000, // 5分钟
        gcTime: 10 * 60 * 1000, // 10分钟
        retry: false
    });
};