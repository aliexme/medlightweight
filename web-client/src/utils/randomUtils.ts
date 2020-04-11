export function generateUniqueString(prefix?: string): string {
  const randomString = `${Date.now()}_${Math.random()}`

  if (prefix) {
    return `${prefix}_${randomString}`
  }

  return randomString
}
