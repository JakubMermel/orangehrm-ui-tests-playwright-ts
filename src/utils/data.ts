export function uniqueId(prefix = 't'): string {
  const stamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 7);
  return `${prefix}_${stamp}_${rand}`;
}