export const getCurrentPage = (url) => {
  const urlSearchParams = new URLSearchParams(url)
  const pageParam = urlSearchParams.get('page')

  if (pageParam) {
    const currentPage = parseInt(pageParam, 10)
    return isNaN(currentPage) ? 1 : currentPage + 1
  } else {
    return 1
  }
}
