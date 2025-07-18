import { MongoClient } from 'mongodb'

const globalForMongo = globalThis as unknown as {
    _mongoClient: Promise<MongoClient> | undefined
}

const uri = process.env.MONGODB_URI!
if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable')
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
    if (!globalForMongo._mongoClient) {
        client = new MongoClient(uri)
        globalForMongo._mongoClient = client.connect()
    }
    clientPromise = globalForMongo._mongoClient
} else {
    client = new MongoClient(uri)
    clientPromise = client.connect()
}

export default clientPromise