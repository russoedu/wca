import React, { Suspense } from 'react'
import { Container, Row } from 'react-bootstrap'
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
        <Row>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/about' component={About}/>
            </Switch>
          </Suspense>
        </Row>
      </Container>
    </Router>
  )
}

export default App
