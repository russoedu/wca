import { Component, createSignal, onCleanup  } from 'solid-js';
import { Router, Routes, Route } from 'solid-app-router'

import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound';

import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

const App: Component = () => {
  return (
    <div class="app">
      <Router>
        <Header></Header>
        <div class='main columns'>
          <div class="column is-desktop is-three-fifths is-offset-one-fifth">
            <Routes>
              <Route path="/about" element={<About />} />
              <Route path="/" element={<Home />} />
              <Route path="/*all" element={<NotFound />} />
            </Routes>
          </div>
        </div>
        <Footer></Footer>
      </Router>
    </div>
  )
}

export default App
