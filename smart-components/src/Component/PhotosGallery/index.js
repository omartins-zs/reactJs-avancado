import React, { memo, useState } from 'react'
import Button from '../Button'

function PhotosGallery(props) {
  const { photos } = props

  const [gallery, setGallery] = useState(photos)

  const handleRemove = (key) => {
    const newGallery = gallery.filter((img, index) => index !== key)
    setGallery(newGallery)
  }

  const renderPhotos = (img, key) => {
    return (
      <div key={`photo-${key}`}>
        <img src={img} alt={`Galeria item ${key + 1}`} />
        <Button onClick={() => handleRemove(key)}>
          Remover {key}
        </Button>
      </div>
    )
  }

  return (
    <div>
      {gallery.map(renderPhotos)}
    </div>
  )
}

export default memo(PhotosGallery)
