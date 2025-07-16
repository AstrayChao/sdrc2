import { getRepositoryById } from "@/lib/data/real-data";
import { notFound } from "next/navigation";
import { RealRepositoryDetail } from "@/components/features/repository/real-repository-detail";

interface PageProps {
    params: Promise<{id: string}>
}

export default async function RepositoryDetailPage({ params }: PageProps) {
    const { id } = await params;
    const repository = getRepositoryById(id);
    if (!repository) {
        notFound()
    }

    return <RealRepositoryDetail repository={repository} />
}

