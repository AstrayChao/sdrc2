'use client'
import { RealRepositoryDetail } from "@/components/features/repository/real-repository-detail";
import React from "react";

interface PageProps {
    params: Promise<{id: string}>;
}

export default function RepositoryDetailPage({ params }: PageProps) {
    const { id } = React.use(params);

    return <RealRepositoryDetail repositoryId={id} />
}

