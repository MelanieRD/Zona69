import { useEffect, useState } from 'react'
import './App.css'
import { Nav } from './assets/components/Nav/Nav'
import { Home } from './assets/pages/Home/Home'
import { Shop } from './assets/pages/Shop/Shop'
import { ProductDetail } from './assets/pages/productDetail/ProductDetail'
import { AddProduct } from './assets/pages/addProduct/AddProduct'
import { Route, Routes } from 'react-router-dom'
import { getListItems } from './assets/utils/shopUtils'
import { createContext } from 'react'
import { CartProvider } from './context/CartContext'

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
    <CartProvider>
      <dataContext.Provider value={data}>
        <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop dataShop={data} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/product/new" element={<AddProduct />} />
          </Routes>
      </dataContext.Provider>
    </CartProvider>
  )
}

export default App
