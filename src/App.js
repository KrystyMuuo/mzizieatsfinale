import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Signup from './components/Signup';
import Signin from './components/Signin';
import Getproduct from './components/Getproduct';
import Addproduct from './components/Addproduct';
import Mpesapayment from './components/Mpesapayment';
import Cart from './components/Cart';
import Chatbot from './components/Chatbot';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <CartProvider>
    <div className="App">
      {/* navbar goes here  */}
      <Navbar/>
      {/* routing  */}
      <Routes>
        <Route path='/' element={<Getproduct/>}/>
        <Route path='/addproduct' element={<Addproduct/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/makepayment' element={<Mpesapayment/>}/>
      </Routes>  
      
        </div>
        <Chatbot />
    </CartProvider>
    </AuthProvider>
    </BrowserRouter>
    
    
  );
}

export default App;
