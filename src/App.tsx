import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import { AddCategory, getAllCategory, getOneCategory, deleteCategory, updateCategory } from './api/category'
import { getAllUser, addUser } from './api/auth'
import AddProductPage from './pages/admin/AddProduct'
import ProductManagementPage from './pages/admin/ProductManagement'
import UpdateProductPage from './pages/admin/UpdateProduct'
import HomePage from './pages/HomePage'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/ProductDetail'
import { IProduct } from './types/product'
import WebsiteLayout from './pages/layouts/WebsiteLayout'
import AdminLayout from './pages/layouts/AdminLayout'
import WatchMovie from './pages/WatchMovie'
import AddCategoryPage from './pages/admin/AddCategory'
import CategoryManagementPage from './pages/admin/ListCategory'
import UpdateCategoryPage from './pages/admin/UpdateCategory'
import LoginForm from './pages/login'
import SignupForm from './pages/signup'
import Register from './pages/signup'
import ListFavorites from './pages/LisrFavorites'
import FavoriteMovies from './pages/LisrFavorites'
import ForgotPassword from './pages/ForgotPassword'

function App() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [user, setUser] = useState([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data))
  }, [])

  useEffect(() => {
    getAllCategory().then(({ data }) => setCategory(data))
  }, [])

  useEffect(() => {
    getAllUser().then(({ data }) => setUser(data))
  }, [])

  //movies
  const onHandleRemove = (id: number) => {
    deleteProduct(id)
  }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product)
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product)
  }
  //categories
  const onHandleAdd2 = (category: any) => {
    AddCategory(category)
  }
  const onHandleRemove2 = (id: number) => {
    deleteCategory(id)
  }
  const onHandleUpdate2 = (category: any) => {
    updateCategory(category)
  }
  const onHandleAdd3 = (user: any) => {
    addUser(user)
  }
  const onHandleRemoveToken = () => {
    function handleClick() {
      // Xóa token ở localstorage
      localStorage.removeItem('token');
    }
    handleClick()
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<WebsiteLayout />}>
          <Route path='/login' element={<LoginForm user={user} />} />
          <Route path='/signup' element={<Register onAdd={onHandleAdd3} user={user} />} />
          <Route path='/' index element={<HomePage />} />
          <Route path='products/:id' element={<ProductDetailPage products={products} category={category} />} />
          <Route path='forgot' element={<ForgotPassword />} />
          {/* favorites */}
          <Route path='listfavorites' element={<FavoriteMovies products={products} />} />
          <Route path='watch/:id' element={<WatchMovie products={products} />} />
        </Route>
        <Route path='/login' element={<LoginForm user={user} />} />
        <Route path='products' element={<ProductPage products={products} onRemove={onHandleRemove} />} />
        <Route path='/admin' >
          <Route path='products' element={<AdminLayout onRemove={onHandleRemoveToken} />}>
            <Route index element={<ProductManagementPage products={products} category={category} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} category={category} />} />
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} category={category} />} />
          </Route>
          <Route path='category' element={<AdminLayout />}>
            <Route path='addcate' element={<AddCategoryPage onAdd={onHandleAdd2} />} />
            <Route path='listcate' element={<CategoryManagementPage products={products} category={category} onRemove={onHandleRemove2} />} />
            <Route path=':id/update' element={<UpdateCategoryPage onUpdate={onHandleUpdate2} category={category} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
