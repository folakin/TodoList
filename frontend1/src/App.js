import React from 'react';
import Form from './Form';
import SignUp from './SignUp';
import './styles/App.css';
import './styles/tailwind.css';

// Main App component that renders the Form and ViewTasks components
// This is the entry point of the React application
const App = () => {
  return ( 
  <div>
    <SignUp />  
    <h1> Task Manager </h1> 
      <h1> Welcome to your Task Manager </h1>
      <h2> LET'S GET STARTED </h2>
      <br />
      <br />
      <Form />
    </div>
  );
}

export default App;
