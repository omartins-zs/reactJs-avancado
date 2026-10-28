import React from 'react'

function BankLink({ label = 'Link Bancário', href = '#' }) {
  return (
    <a href={href}>
      {label}
    </a>
  )
}

export default BankLink
