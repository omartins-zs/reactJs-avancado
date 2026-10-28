import React from 'react'
import { Button, PhotosGallery } from './components'
import { sanitizeString } from './commons/utils/string'

function App () {
  const photos = [
    'https://picsum.photos/seed/people/140/60',
    'https://picsum.photos/seed/animals/140/60',
    'https://picsum.photos/seed/tech/140/60',
    'https://picsum.photos/seed/any/140/60',
    'https://picsum.photos/seed/nature/140/60',
  ]

  const title = sanitizeString('Galeria de fotos')

  return (
    <>
      <h1>{title}</h1>
      <PhotosGallery photos={photos} />
      <Button onClick={() => {}}>
        Atualizar Galeria
      </Button>
    </>
  )
}

export default App
