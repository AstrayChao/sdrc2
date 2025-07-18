import { Db, MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable')
}

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase() {
    if (cachedClient && cachedDb) {
        return { client: cachedClient, db: cachedDb }
    }

    const client = await MongoClient.connect(uri as string)
    const db = client.db()

    cachedClient = client
    cachedDb = db

    return { client, db }
}