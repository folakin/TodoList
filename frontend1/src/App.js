import React from 'react';
import Form from './Form';
import LogIn from './LogIn';
import './styles/App.css';
import './styles/tailwind.css';

// Main App component that renders the Form and ViewTasks components
// This is the entry point of the React application
const App = () => {
  return ( 
  <div>
    <LogIn />
    <br />
    <br />
    <br />
    <h1> Task Manager </h1> 
      <h1> Welcome to your Task Manager </h1>
      <h2> LET'S GET STARTED </h2>
      <br />
      <br />
      <Form />
     {/* <ViewTasks /> */}
    </div>
  );
}

export default App;
