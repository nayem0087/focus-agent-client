import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function GET(req: Request) {
    try {
        return await handler.GET(req);
    } catch (err) {
        console.error("🔥🔥🔥 AUTH GET ERROR 🔥🔥🔥");
        console.error(err);
        return new Response(
            JSON.stringify({
                error: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : undefined,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function POST(req: Request) {
    try {
        return await handler.POST(req);
    } catch (err) {
        console.error("🔥🔥🔥 AUTH POST ERROR 🔥🔥🔥");
        console.error(err);
        return new Response(
            JSON.stringify({
                error: err instanceof Error ? err.message : String(err),
                stack: err instanceof Error ? err.stack : undefined,
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}