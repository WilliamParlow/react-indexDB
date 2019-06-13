import React from 'react';
import Navbar from './components/Navbar/Navbar';
import TodoListTable from './containers/TodoListTable';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TodoListTable />
    </div>
  );
}

export default App;
