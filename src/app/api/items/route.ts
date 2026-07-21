import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { headers } from "next/headers";
import { auth } from "@/lib/auth"; 

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
    const message =
      err instanceof Error ? err.message : "Failed to fetch items";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "You must be logged in to add an item" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { title, description, price, date, rating, location, image } = body;

    if (!title || !description || !price || !location) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const connectedClient = await clientPromise;
    const db = connectedClient.db(dbName);

    const result = await db.collection("items").insertOne({
      title,
      description,
      price,
      date: date || new Date().toDateString(),
      rating: Number(rating) || 5,
      location,
      image: image || "",
      userEmail: session.user.email, 
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId.toString(),
    });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Failed to add item";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}