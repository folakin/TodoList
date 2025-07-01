import React, { useState } from 'react';


const Form = () =>  {

    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!taskName || !taskPriority) {
            alert('Please fill in both fields');
            return;
        }
        const query = {
        name: taskName,
        priority: taskPriority
    };

        try {
            const response = await fetch(`http://localhost:8000/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(query)
            });
    

    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();
    console.log('Task created:', data);
    setTaskName('');
    setTaskPriority('');
  } catch (error) {
    console.error(error);
    alert('Failed to create task');
  }
};
        // Handle form submission logic here

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <input tabIndex={1} type="text" placeholder="Enter Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} /> <br></br>
            <input tabIndex={2} type="text" placeholder="Enter Task Priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} /> <br></br>
        </div>

        <div>
            <button tabIndex={3}>Add Task</button>
        </div>
    </form>
    );
}

export default Form;

