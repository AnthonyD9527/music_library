import { useEffect, useState, useRef, Fragment } from 'react'
import { BroweserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery.js'
import SearchBar from './components/SearchBar.js'
import { DataContext } from './context/DataContext.js'
import { SearchContext } from './context/SearchContext.js'
import AlbumView from './components/AlbumView.js'
import ArtistView from './components/ArtistView.js'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])
    let searchInput = useRef('')

    const API_URL = 'https://itunes.apple.com/search?term='


  const handleSearch = (e, term) => {
    e.preventDefault()
    const fetchData = async () => {
        document.title = `${term} Music`
        const response = await fetch(API_URL + term)
        const resData = await response.json()
        if (resData.results.length > 0) {
            return setData(resData.results)
        } else {
            return setMessage('Not Found.')
        }
    }
    fetchData()
}



return (
  <div>
  {message}
      <Router>
          <Routes>
              <Route path="/" element={
                  <Fragment>
                      <SearchBar handleSearch = {handleSearch}/>
                      <Gallery data={data} />
                  </Fragment>
              } />
              <Route path="/album/:id" element={<AlbumView />} />
              <Route path="/artist/:id" element={<ArtistView />} />
          </Routes>
      </Router>
  </div>
)

}

export default App


