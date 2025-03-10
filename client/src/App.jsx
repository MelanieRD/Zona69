import { useEffect, useState } from 'react'
import './App.css'
import { Nav } from './assets/components/Nav/Nav'
import { Home } from './assets/pages/Home/Home'
import { Shop } from './assets/pages/Shop/Shop'
import { Route, Routes } from 'react-router-dom'
import { getListItems } from './assets/utils/shopUtils'
import { createContext } from 'react'

function App() {
  const dataContext = createContext();
  const [data, setData] = useState([]);
 

 const handleShopItems = async () => {
    let dataGettedFromFetch =  await getListItems();

    if(dataGettedFromFetch.length > 0){
      setData(dataGettedFromFetch);
      console.log(dataGettedFromFetch);
  }}


useEffect(() => {
  handleShopItems();
  
}, [])

  return (
    <dataContext.Provider value={data}>
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop dataShop={data} />} />
        </Routes>
    </dataContext.Provider>
  )
}

export default App
