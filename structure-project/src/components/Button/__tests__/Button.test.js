import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button from '../index'

describe('Button component', () => {
  test('renders button children and handles click', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Clique aqui</Button>)
    fireEvent.click(getByText('Clique aqui'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
