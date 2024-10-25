export function createProductURL(params?: string) {
  return `${process.env.GATSBY_WEBAPP_URL}/astrologer` + (params ? `?${params}` : "");
}
