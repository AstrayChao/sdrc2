// hooks/useRepositoryDetail.ts
import { useQuery } from '@tanstack/react-query';

const fetchRepositoryDetail = async (id: string) => {

    const response = await fetch(`/api/repositories/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    console.log(response)

    if (!response.ok) {
        throw new Error('Repository not found');
    }
    return response.json();
};

export const useRepositoryDetail = (id: string) => {

    return useQuery({
        queryKey: ['repository', id],
        queryFn: () => fetchRepositoryDetail(id),
        enabled: !!id,
        staleTime: 0
    });
};
