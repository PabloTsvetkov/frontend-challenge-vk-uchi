import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import './App.css'
import MainPage from './pages/MainPage/MainPage'
import FavoritePage from './pages/FavoritePage/FavoritePage'
import { useCats } from './hooks/useCats'

function App() {
  const { cats, favoriteCats, changeFavorite, loadMoreCats, isLoading, error } = useCats();
  return (
    <div className='AppMainContainer'>
      <nav className='header'>
        <NavLink to='/' className={({ isActive }) => (!isActive ? 'navigationLink' : 'navigationLink active')}>Все котики</NavLink>
        <NavLink to='/favorite' className={({ isActive }) => (!isActive ? 'navigationLink favorite' : 'navigationLink favorite active')}>Любимые котики</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={<MainPage cats={cats} changeFavorite={changeFavorite} loadMoreCats={loadMoreCats} isLoading={isLoading} error={error} />} />
        <Route
          path='/favorite'
          element={
            <FavoritePage favoriteCats={favoriteCats} changeFavorite={changeFavorite} />
          }
        />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </div>
  )
}

export default App
