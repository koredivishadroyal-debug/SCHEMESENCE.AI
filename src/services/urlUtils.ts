/**
 * Safely normalizes a URL string to ensure it has http:// or https://
 */
export function getSafeUrl(url?: string | null): string {
  if (!url || typeof url !== 'string' || !url.trim()) {
    return 'https://www.india.gov.in';
  }
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Safely extracts hostname from a URL without ever throwing an Uncaught TypeError
 */
export function getHostname(url?: string | null): string {
  try {
    const safe = getSafeUrl(url);
    const parsed = new URL(safe);
    return parsed.hostname || 'india.gov.in';
  } catch {
    return 'india.gov.in';
  }
}
