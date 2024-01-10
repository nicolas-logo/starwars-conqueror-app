import { getCurrentPage } from './utilFunctions'

describe('getCurrentPage', () => {
  it('returns 1 if there is no "page" parameter in the URL', () => {
    const url = 'http://example.com'
    expect(getCurrentPage(url)).toBe(1)
  })

  it('returns 1 if the "page" parameter is not a valid number', () => {
    const url = 'http://example.com?search=value&page=abc'
    expect(getCurrentPage(url)).toBe(1)
  })

  it('returns the parsed "page" parameter incremented by 1', () => {
    const url = 'http://example.com?search=value&page=2'
    expect(getCurrentPage(url)).toBe(3)
  })

  it('handles URL with multiple parameters and returns the correct current page', () => {
    const url = 'http://example.com?search=value1&page=5&param2=value2'
    expect(getCurrentPage(url)).toBe(6)
  })
})
