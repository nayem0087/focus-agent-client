// src/app/api/items/route.ts
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const dynamic = "force-dynamic";

const uri = process.env.MONGO_DB_URL as string;
const dbName = process.env.AUTH_DB_NAME as string;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalWithMongo._mongoClientPromise!;

export async function GET() {
  try {
    const connectedClient = await clientPromise;
    const db = connectedClient.db(dbName);
    const items = await db.collection("items").find({}).toArray();

    const serialized = items.map((item) => ({
      ...item,
      _id: item._id.toString(),
    }));

    return NextResponse.json(serialized);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to fetch items";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}