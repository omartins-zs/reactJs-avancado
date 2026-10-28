import React, { useRef, useEffect, useState } from 'react'

function App() {
  const inputRef = useRef()
  const count = useRef(1)
  const [, setValue] = useState(false)

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      count.current = 300
      setValue(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <h1>Valor de count: {count.current}</h1>
      Foco: <input ref={inputRef} />
      <br />
      <br />
      <br />
      <button onClick={handleClick}>Focar</button>
    </>
  )
}

export default App
