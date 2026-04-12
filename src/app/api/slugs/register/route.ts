import { NextResponse, type NextRequest } from "next/server";
import {
  getSlugRedis,
  isHttpsUrl,
  isValidSlugToken,
  slugStorageKey,
} from "@/lib/slug-redis";

type Body = { slug?: string; destinationUrl?: string };

/**
 * Upserts slug → https destination in Redis (used by the browser demo after create / on sync).
 * Open in MVP: protect with auth + workspace checks when moving beyond local Docker demos.
 */
export async function POST(request: NextRequest) {
  const redis = await getSlugRedis();
  if (!redis) {
    return NextResponse.json(
      { ok: false, error: "redis_unconfigured", message: "Set REDIS_URL (e.g. Docker Compose)." },
      { status: 503 },
    );
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const slug = typeof body.slug === "string" ? body.slug : "";
  const destinationUrl =
    typeof body.destinationUrl === "string" ? body.destinationUrl.trim() : "";

  if (!isValidSlugToken(slug)) {
    return NextResponse.json({ ok: false, error: "invalid_slug" }, { status: 400 });
  }
  if (!isHttpsUrl(destinationUrl)) {
    return NextResponse.json(
      { ok: false, error: "invalid_destination", message: "Only https:// URLs are allowed." },
      { status: 400 },
    );
  }

  await redis.set(slugStorageKey(slug), destinationUrl);
  return NextResponse.json({ ok: true });
}
