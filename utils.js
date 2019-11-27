export const formatSeconds = seconds => {
  if (seconds < 60) {
    return `${seconds}s`
  } else {
    let min = Math.floor(seconds / 60)
    let sec = seconds % 60
    return `${min}min ${sec}s`
  }
}
