import React, { useState } from 'react';

const ViewTasks = () => {

    const [tasks, setTasks] = useState([]);

    const fetchTasks = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/tasks`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTasks(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
 
  return (
    <div>
      <button onClick={fetchTasks}>View Tasks</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.priority}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewTasks;
