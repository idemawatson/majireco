const sliceText = (text: string, limit: number): string => {
  return text.length <= limit ? text : `${text.slice(0, limit)}`
}

export default sliceText
