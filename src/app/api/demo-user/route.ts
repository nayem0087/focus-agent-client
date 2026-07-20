import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = new MongoClient(process.env.MONGO_DB_URL as string);
    await client.connect();
    const db = client.db(process.env.AUTH_DB_NAME as string);
    
    const user = await db.collection("user").findOne({});

    if (!user) {
      return NextResponse.json({ error: "No user found in database" }, { status: 404 });
    }

    return NextResponse.json({ email: user.email });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}