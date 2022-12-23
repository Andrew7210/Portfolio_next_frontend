
// returns a random integer between the min/max
export function random(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// converts text to camelCase
export function camelCase(str) {
  return str.toLowerCase() .replace(/([-_\s][a-z])/g, 
    (group) => group.toUpperCase().replace(/[-_\s]/g, '')
  )
}