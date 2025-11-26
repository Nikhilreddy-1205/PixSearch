import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showPrompt, setShowPrompt] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=53370287-d4156e79e754dee6defb1d7d9&q=${encodeURIComponent(query)}&image_type=photo&page=${currentPage}&per_page=5`)
      .then(res => res.json())
      .then((d) => setData(d.hits || []))
      .catch(console.error)
  }, [query, currentPage])

  function handlePrev() {
   setCurrentPage(currentPage - 1)
  }
  function handleNext() {
    setCurrentPage(currentPage + 1)
  }
  function handleImageClick(item) {
    setSelectedImage(item)
    setShowPrompt(true)
  }
  function closePrompt() {
    setShowPrompt(false)
    setSelectedImage(null)
  }

  return (
    <div>
      <input
        placeholder='searchimage'
        type='text'
        onChange={(e) => {
          setQuery(e.target.value)
          setCurrentPage(1)
        }}
      />
      <div className="gallery">
        {data.slice(0, 5).map((item) => (
          <img
            key={item.id}
            src={item.webformatURL}
            alt={item.tags}
            onClick={() => handleImageClick(item)}
            tabIndex={0}
            
          />
        ))}
      </div>
      <button onClick={handlePrev} disabled={currentPage === 1}>PREV</button>
      <button onClick={handleNext}>NEXT</button>
      {showPrompt && selectedImage && (
        <div className="modal-bg" onClick={closePrompt}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <img src={selectedImage.webformatURL} alt={selectedImage.tags} 
             width="800"
        height="800"
        style={{ objectFit: 'cover', borderRadius: '8px' }}/>
            <button onClick={closePrompt}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
