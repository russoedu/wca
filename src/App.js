import React, { Suspense } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import './App.css'
import { Analysis } from './Pages/Analysis'
import { Home } from './Pages/Home'

function App () {
  return (
    <>
      <Router>
        <header>
          <Link to='/'>WhYMCA</Link>
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/analysis' component={Analysis}/>
            </Switch>
          </Suspense>
        </main>
      </Router>
    </>
  )
}

export default App
