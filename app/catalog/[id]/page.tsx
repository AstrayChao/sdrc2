'use client'
import { RealRepositoryDetail } from "@/components/features/repository/real-repository-detail";
import React from "react";
import type { Repository } from "@/types/repository";
import { useRepositoryDetail } from "@/hooks/use-repository-detail";

interface PageProps {
    params: Promise<{id: string}>;
}

interface ApiResponse {
    repository: Repository;
}

export default function RepositoryDetailPage({ params }: PageProps) {
    const { id } = React.use(params);
    console.log(id)

    const { data, isLoading, error } = useRepositoryDetail(id)

    if (isLoading || !data) {
        return <div>Loading...</div>;
    }
    console.log(data)

    return <RealRepositoryDetail repository={data.repository} />
}

