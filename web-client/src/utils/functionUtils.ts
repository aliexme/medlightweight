export const throttle = <F extends (...args: any) => void>(func: F, delay: number): F => {
  let isCooldown = false

  return ((...args) => {
    if (isCooldown) {
      return
    }

    func(...args)
    isCooldown = true

    setTimeout(() => {
      isCooldown = false
    }, delay)
  }) as F
}

export const debounce = <F extends (...args: any) => void>(func: F, delay: number): F => {
  let timeoutId: NodeJS.Timeout = null

  return ((...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }) as F
}
