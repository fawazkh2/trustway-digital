export function safeInternalPath(candidate: string | null, origin: string, fallback: string) {
  if (!candidate || candidate.includes("\\")) return fallback;

  try {
    const url = new URL(candidate, origin);
    return url.origin === origin && url.pathname.startsWith("/") ? `${url.pathname}${url.search}${url.hash}` : fallback;
  } catch {
    return fallback;
  }
}
