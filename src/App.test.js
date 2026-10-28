import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App, { DEMO_USERS } from './App'

describe('Portal ReactJS Avançado', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('renderiza tela de login e permite acesso rápido com perfil de demonstração', () => {
    render(<App />)
    expect(screen.getByText(/Portal ReactJS Avançado/i)).toBeInTheDocument()

    const adminButton = screen.getByText(DEMO_USERS[0].role)
    fireEvent.click(adminButton)

    expect(screen.getByText(/Bem-vindo\(a\), Administrador DIO!/i)).toBeInTheDocument()
  })
})
