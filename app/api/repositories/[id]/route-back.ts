import { NextRequest, NextResponse } from "next/server";
import { getRepositoryById } from "@/lib/db/repositories";

export async function GET(request: NextRequest, { params }: {params: Promise<{id: string}>}) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing repository ID" }, { status: 400 });
    }
    const repo = await getRepositoryById(id)
    return NextResponse.json({
        repository: repo
    });
}