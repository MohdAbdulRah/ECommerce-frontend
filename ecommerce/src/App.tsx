
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './Home'
import About from './About'
import Layout from './Layout'
import ViewProduct from './ViewProduct'
import AddProduct from './AddProduct'
import CartPage from './CartPage'

function App() {
 

  return (
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout />}>
               <Route path="/" element={<Home />} />
              <Route path='/about' element={<About />}  />

              <Route path='/product/:id' element={<ViewProduct />}/>
              <Route path='/add/:id?' element={<AddProduct />}/>
              <Route path='/cart' element={<CartPage />}/>
         </Route>
         
       </Routes>
    
    
    
    </BrowserRouter>
     
    
  )
}

export default App
