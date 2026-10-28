import React, { Fragment } from 'react'

const store = ['', '', '']

function Column() {
  return (
    <tr>
      <td>Tênis</td>
      <td>Roupa</td>
    </tr>
  )
}

function App() {
  const renderColumns = (element, key) => (
    <Fragment key={`column-${key}`}>
      <Column />
    </Fragment>
  )

  return (
    <table>
      <tbody>
        {store.map(renderColumns)}
      </tbody>
    </table>
  )
}

export default App
