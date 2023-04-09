import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import HomePage from '../pages/HomePage';
import UserForm from '../components/UserForm';
import Login from '../components/Login';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/register" element={<UserForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/posts/create" element={<PostForm />} />
      <Route path="/posts/list" element={<PostList />} />
      <Route path="" />
    </Routes>
  );
};

export default AllRoutes;
