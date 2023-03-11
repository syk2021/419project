import React, {useState} from 'react';
import LoginRegistration from "./LoginRegistration.js";
import Posts from "./Posts.js";
import { NativeRouter, Routes, Route} from 'react-router-native';

const YourApp = () => {
  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<LoginRegistration/>}/>
        <Route path="/posts" element={<Posts/>}/>
      </Routes>
    </NativeRouter>
  );
};

export default YourApp;