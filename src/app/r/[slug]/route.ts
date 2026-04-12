import { NextResponse, type NextRequest } from "next/server";
import {
  getSlugRedis,
  isHttpsUrl,
  isValidSlugToken,
  slugStorageKey,
} from "@/lib/slug-redis";

/**
 * Public redirect: GET /r/{slug} → 302 to stored https URL (Redis).
 * Requires REDIS_URL (see Docker Compose `app` service).
 */
export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const raw = slug?.trim() ?? "";

  if (!isValidSlugToken(raw)) {
    return NextResponse.json({ error: "invalid_slug" }, { status: 400 });
  }

  const redis = await getSlugRedis();
  if (!redis) {
    return NextResponse.json(
      {
        error: "redis_unconfigured",
        message: "Set REDIS_URL so /r/{slug} can resolve (e.g. docker compose --profile app).",
      },
      { status: 503 },
    );
  }

  const destination = await redis.get(slugStorageKey(raw));
  if (!destination || !isHttpsUrl(destination)) {
    return NextResponse.json({ error: "not_found", slug: raw }, { status: 404 });
  }

  return NextResponse.redirect(destination, 302);
}
