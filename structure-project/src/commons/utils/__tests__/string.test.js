import { sanitizeString, removeSpace } from '../string'

describe('string utils', () => {
  test('sanitizeString removes leading and trailing spaces', () => {
    expect(sanitizeString('  react  ')).toBe('react')
  })

  test('removeSpace removes all whitespace characters', () => {
    expect(removeSpace('react js avancado')).toBe('reactjsavancado')
  })
})
