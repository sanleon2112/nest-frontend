"use client";

import React from 'react'
import Landing from './components/Landing/Landing';
require('dotenv').config();


function page() {
  return (
    <div>
      <Landing />
    </div>
  );
}

export default page;
