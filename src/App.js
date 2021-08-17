import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { About } from './Pages/About'
import { Header } from './Components/Header'

function App () {
  return (
    <Router>
      <Header></Header>
      <Container fluid>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/about' component={About}/>
        </Switch>
      </Container>
    </Router>
  )
}

export default App
