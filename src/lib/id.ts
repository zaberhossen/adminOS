let counter = 0

/**
 * Monotonic id for windows/keys. A counter (not Date.now()) keeps callers pure
 * and produces stable, collision-free ids within a session.
 */
export function nextId(prefix = "window"): string {
  counter += 1
  return `${prefix}-${counter}`
}
