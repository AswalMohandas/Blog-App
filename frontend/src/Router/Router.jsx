
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AuthRoute from "../components/AuthRoute";
import BlogDetails from "../pages/BlogDetails";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/EditBlog";
import Profile from "../pages/Profile";

function Router() {

  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/create-blog"
        element={
          <AuthRoute>
            <CreateBlog />
          </AuthRoute>
        }
      />

      <Route path="/blog/:id" element={<BlogDetails />} />
      
     <Route
       path="/edit-blog/:id"
       element={<EditBlog />}
      />

      <Route path="/profile" element={<Profile/>}/>
      
    </Routes>
  );
}

export default Router;