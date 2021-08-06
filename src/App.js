import React, { Suspense } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { FileDrop } from './Components/FileDrop'
import { Analysis } from './Components/Analysis'

function App() {
  return (
    <>
      <Router>
        <header>
          <Link to="/">WCA</Link>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={FileDrop}/>
              <Route exact path="/analysis" component={Analysis}/>
            </Switch>
          </Suspense>
        </main>
      </Router>
    </>
  );
}

export default App;
