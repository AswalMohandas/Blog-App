import React from "react";
import Navigation from "../components/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import './Home.css';
import { FiSearch } from "react-icons/fi";
import BlogList from "../components/Blog/BlogList";


function Home({blogs}){
  return (
    <div>
      <Navigation />
      <Container fluid className="bg bg-primary landing__wrapper text-light text-center d-flex flex-column justify-content-center align-items-center">
        <h1 >Welcome to Blog</h1> 
        <p>Explore number of blogs from various categories</p>
        <InputGroup className="mb-3 w-50">
          <InputGroup.Text id="basic-addon1" className="iconWrapper">
             <FiSearch/>
          </InputGroup.Text>
          <Form.Control type="search" className="landing__searchInput" placeholder="Search you blogs here..."/>
      </InputGroup>
      </Container>
      <Container className="mt-5">
        <h2 className="text-center mb-4">All Blogs</h2>
      </Container>
     {/* <BlogList blogs={blogs} deleteBlog={deleteBlog} /> */}
     <BlogList />

     {/* Create new Blog */}
     
     
      <div className="container mt-5">
      

        {(blogs || []).map((blog, index) => (
          <div key={index} className="card p-3 mb-3">
            <h3>{blog.title}</h3>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
  
  

export default Home;