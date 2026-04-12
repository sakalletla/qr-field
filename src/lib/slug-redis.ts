import { createClient } from "redis";

type SlugRedis = ReturnType<typeof createClient>;

const globalForRedis = globalThis as unknown as {
  qrfieldRedis?: SlugRedis;
  qrfieldRedisConnect?: Promise<unknown>;
};

export function getRedisUrl(): string | null {
  const u = process.env.REDIS_URL?.trim();
  return u && u.length > 0 ? u : null;
}

/** Server-side Redis client (Docker Compose provides `redis://redis:6379` for `app`). */
export async function getSlugRedis(): Promise<SlugRedis | null> {
  const url = getRedisUrl();
  if (!url) return null;

  if (!globalForRedis.qrfieldRedis) {
    const client = createClient({ url });
    client.on("error", (err) => console.error("[slug-redis]", err));
    globalForRedis.qrfieldRedis = client;
    globalForRedis.qrfieldRedisConnect = client.connect() as Promise<unknown>;
  }

  await globalForRedis.qrfieldRedisConnect;
  return globalForRedis.qrfieldRedis ?? null;
}

export const SLUG_KEY_PREFIX = "qrfield:slug:";

export function slugStorageKey(slug: string): string {
  return `${SLUG_KEY_PREFIX}${slug.trim().toLowerCase()}`;
}

export function isValidSlugToken(slug: string): boolean {
  return /^[a-z0-9-]{3,64}$/i.test(slug.trim());
}

export function isHttpsUrl(value: string): boolean {
  try {
    const u = new URL(value.trim());
    return u.protocol === "https:";
  } catch {
    return false;
  }
}
