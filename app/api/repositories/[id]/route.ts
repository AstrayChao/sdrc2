import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { RepositoryDocument } from "@/types/repository";
import { ObjectId } from "mongodb";
import { extractArrayValues, extractValue } from "@/lib/utils";

export async function GET(request: NextRequest, { params }: {params: Promise<{id: string}>}) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ error: "Missing repository ID" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection<RepositoryDocument>("final");


    const repository = await collection.findOne({ _id: new ObjectId(id) });

    if (!repository) {
        return NextResponse.json({ error: "Repository not found" }, { status: 404 });
    }

    const { _id, ...rest } = repository;
    const transformedRepo = {
        ...rest,
        id: _id.toString(),
        repositoryName: extractValue<string>(rest.repositoryName),
        description: extractValue<string>(rest.description),
        subject: extractArrayValues<{value: string}>(rest.subject),
        keyword: extractArrayValues<string>(rest.keyword),
        contentType: extractArrayValues<{value: string}>(rest.contentType),
        additionalName: extractArrayValues<{value: string}>(rest.additionalName),
        institution: rest.institution?.map(inst => ({
            ...inst,
            institutionName: extractValue<string>(inst.institutionName),
            institutionAdditionalName: extractArrayValues<{value: string}>(inst.institutionAdditionalName)
        }))
    };
    return NextResponse.json({
        repository: transformedRepo
    });
}