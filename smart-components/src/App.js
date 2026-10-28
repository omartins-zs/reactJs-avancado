import React from 'react'
import PhotosGallery from './Component/PhotosGallery'

function App () {
  const photos = [
    'https://picsum.photos/seed/people/140/60',
    'https://picsum.photos/seed/animals/140/60',
    'https://picsum.photos/seed/tech/140/60',
    'https://picsum.photos/seed/any/140/60',
    'https://picsum.photos/seed/nature/140/60',
  ]

  return (
    <>
      <h1>Galeria de fotos</h1>
      <PhotosGallery photos={photos} />
    </>
  )
}

export default App
