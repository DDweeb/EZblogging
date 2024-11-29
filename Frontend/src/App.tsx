import './App.css'
import Signup from "./pages/signup";
import Signin from './pages/signin';
import GetBlogs from './pages/getblogs';
import CreateBlog from './pages/createblog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetOneBlog from './pages/getOneBlog';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/createblog' element={<CreateBlog />} />
          <Route path='/getblogs' element={<GetBlogs />} />
          <Route path='/getoneblog/:id' element={<GetOneBlog />}></Route>
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App
