import React from 'react'
import Navbar from './components/Navbar/Navbar'
import TodoListTable from './containers/TodoListTable/TodoListTable'
import TodoPriority from './containers/TodoPriority/TodoPriority'
import TodoCalendar from './containers/TodoCalendar/TodoCalendar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="app-content-wrapper">
          <Switch>
            <Route path="/" exact component={TodoListTable} />
            <Route path="/todo-calendar" component={TodoCalendar} />
            <Route path="/todo-priority" component={TodoPriority} />
          </Switch>
          <div className="footer-content-wrapper" >
              <Footer description="There is a React project by @Will to use like a model for comparision with 
                  another project using React and Redux"/>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
