/**
 * Rate Limiting and Privacy-Preserving IP Hashing
 */

// In-memory sliding window store for local dev and single worker runtime
const rateLimitMap = new Map<string, number[]>();

export async function hashIp(ip: string, salt: string = 'shayonam-salt-2026'): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export function checkRateLimit(
  ipHash: string,
  limit: number = 5,
  windowMs: number = 10 * 60 * 1000 // 10 minutes
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ipHash) || [];
  
  // Prune expired timestamps
  const activeTimestamps = timestamps.filter((time) => now - time < windowMs);
  
  if (activeTimestamps.length >= limit) {
    return { allowed: false, remaining: 0 };
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ipHash, activeTimestamps);

  // Periodic memory cleanup if map grows
  if (rateLimitMap.size > 2000) {
    for (const [key, times] of rateLimitMap.entries()) {
      if (times.every((t) => now - t >= windowMs)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return { allowed: true, remaining: limit - activeTimestamps.length };
}
