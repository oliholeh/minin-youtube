import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AlertState } from './context/alert/AlertState'
import { FirebaseState } from './context/firebase/FirebaseState'
import { About } from './pages/About'
import { Home } from './pages/Home'

function App() {
  return (
    <FirebaseState>
      <AlertState>
        <Router>
          <Navbar />
          <div className="container mt-4">
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path="/about" component={About} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </FirebaseState>
  )
}

export default App
