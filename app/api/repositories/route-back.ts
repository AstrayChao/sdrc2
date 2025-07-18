import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getRepositories } from "@/lib/db/repositories";

const searchParamsSchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    source: z.enum(["re3data", "fairsharing", "gcbr", "all"]).default("all"),
    subjects: z.string().optional(),
});

const repositorySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    url: z.string().url(),
    from: z.array(z.enum(["re3data", "FAIRsharing", "GCBR"])),
    subjects: z.array(z.string()).optional(),
    keywords: z.array(z.string()).optional(),
});


export async function GET(request: NextRequest) {
    try {

        const { searchParams } = new URL(request.url);

        const params = searchParamsSchema.parse(Object.fromEntries(searchParams));
        const { repositories, pagination, stats } = await getRepositories(params)


        return NextResponse.json(
            {
                repositories,
                pagination,
                stats
            },
            {
                headers: {
                    "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
                },
            }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid parameters", details: error.errors }, { status: 400 });
        }

        console.error("API Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}


// export async function POST(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const repository = repositorySchema.parse(body);
//
//         const { db } = await connectToDatabase();
//         const collection = db.collection<Repository>("final");
//
//         const result = await collection.insertOne(repository);
//
//         return NextResponse.json(
//             {
//                 _id: result.insertedId,
//                 ...repository,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
//         }
//
//         console.error("API Error:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

// export async function PUT(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const id = searchParams.get("id");
//         if (!id) {
//             return NextResponse.json({ error: "Missing repository ID" }, { status: 400 });
//         }
//
//         const body = await request.json();
//         const repository = repositorySchema.parse(body);
//
//         const { db } = await connectToDatabase();
//         const collection = db.collection<Repository>("final");
//
//         const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: repository });
//
//         if (result.matchedCount === 0) {
//             return NextResponse.json({ error: "Repository not found" }, { status: 404 });
//         }
//
//         return NextResponse.json({ success: true });
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
//         }
//
//         console.error("API Error:", error);
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//     }
// }

// export async function DELETE(request: NextRequest) {
//     try {
//         const { searchParams } = new URL(request.url)
//         const id = searchParams.get("id")
//         if (!id) {
//             return NextResponse.json({ error: "Missing repository ID" }, { status: 400 })
//         }

//         const { db } = await connectToDatabase()
//         const collection = db.collection<Repository>("repositories")

//         const result = await collection.deleteOne({ _id: new ObjectId(id) })

//         if (result.deletedCount === 0) {
//             return NextResponse.json({ error: "Repository not found" }, { status: 404 })
//         }

//         return NextResponse.json({ success: true })
//     } catch (error) {
//         console.error("API Error:", error)
//         return NextResponse.json({ error: "Internal server error" }, { status: 500 })
//     }
// }
