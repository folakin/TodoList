import React from 'react';
import Form from './Form';
import './styles/App.css';


// Main App component that renders the Form and ViewTasks components
// This is the entry point of the React application
const App = () => {
  return ( 
  <div>
    <h1> Task Manager </h1> 
      <h1> Welcome to your Task Manager </h1>
      <h2> LET'S GET STARTED </h2>
      <Form />
     {/* <ViewTasks /> */}
    </div>
  );
}

export default App;
