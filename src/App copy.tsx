import { Component, createSignal, onCleanup  } from 'solid-js';
import { Router } from "solid-app-router"
import Progress from './components/Progress'

import logo from "./logo.svg";
import styles from './App.module.css';
import Header from './components/Header';

const App: Component = () => {
  const [count, setCount] = createSignal(0)
  const timer = setInterval(() => setCount(count() + 1), 2)
  function onCleanup(e: Event) {
    console.log(e)    
    clearInterval(timer)
  }
  return (
    <div class={styles.App}>
      <Router>
        <Header></Header>
          <img src={logo} class={styles.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            class={styles.link}
            href="https://github.com/solidjs/solid"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn Solid
          </a>
        <Progress id="p" val={count} title="Testing"></Progress>
        <a class="button is-primary" onClick={onCleanup}>STOP</a>
      </Router>
    </div>
  )
}

export default App
