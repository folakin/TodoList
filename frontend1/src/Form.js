import React, { useState } from 'react';



const Form = () =>  {

    const [taskName, setTaskName] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [tasks, setTasks] = useState([]);
    const [showTasks, setShowTasks] = useState(false);


    const addTask = async(name, priority) => {
        if (!name || !priority) {
            alert('Please fill in all fields');
            return;
        }

        const query = {
            name: name,
            priority: priority,
            description: taskDesc
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
    setTaskDesc('');

    } catch (error) {
    console.error(error);
    alert('Failed to create task');
    }

    }

    const fetchTasks = async () => {
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
    }

    const completeTask = async (taskId) => {
        console.log('Completing task with ID:', taskId);
        try {
            const response = await fetch(`http://localhost:8000/tasks/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: taskId })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Task completed:', data);
        } catch (error) {
            console.error('Error completing task:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate input
        await addTask(taskName, taskPriority, taskDesc);
        await fetchTasks();
       
    };

    const handleToggle = () => {
        setShowTasks(prev => !prev);
    }

        // Handle form submission logic here

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <input tabIndex={1} type="text" placeholder="Enter Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} /> <br></br>
            <input tabIndex={2} type="text" placeholder="Enter Task Priority" value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} /> <br></br>
            <input tabIndex={2} type="text" placeholder="Enter Task Description" value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} /> <br></br>
        </div>

        <div>
            <button tabIndex={3}>Add Task</button>
        </div>
        <div>
            <button type="button" tabIndex={4} onClick={handleToggle}>{showTasks ? 'Hide Tasks' : 'View Tasks'}</button>
        </div>
        <div>
            {showTasks && (
                <ul>
                    {tasks
                    .filter((task) => !task.completed)
                    .map((task) => (
                        <li key={task.id}>
                            {task.name} - {task.priority} - {task.description && <span>Description: {task.description}</span>}
                            <button type="button" onClick={() => completeTask(task.id)}>Complete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </form>
    );
}

export default Form;

