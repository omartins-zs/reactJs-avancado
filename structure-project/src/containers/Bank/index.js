import React from 'react'
import BankLink from './components/BankLink'

function BankContainer() {
  return (
    <div>
      <h2>Painel Bancário</h2>
      <BankLink label="Acessar Extrato" href="#extrato" />
    </div>
  )
}

export default BankContainer
