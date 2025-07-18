from fastapi import FastAPI, HTTPException
from Task import Task
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from test_mongo import lifespan

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = {}
next_id = 1

class TaskRequest(BaseModel):
    name: str
    priority: str
    description: str

@app.get("/tasks")
def get_tasks():
    return [task.to_dict() for task in tasks.values()]

@app.post("/tasks")
def add_tasks(task: TaskRequest):
    global next_id
    nt = Task(task.name, task.priority, task.description)
    nt.set_id(next_id)  # Now set the id property on the object
    next_id += 1
    tasks[nt.id] = nt
    return tasks
   #return {'Task created': nt.to_dict() }

@app.put("/tasks/{id}")
def complete_task(id: int):
    if id in tasks:
        tasks[id].complete()
        return {
            "message": "Task marked as complete",
            "task": {
                "id": id,
                "name": tasks[id].name,
                "status": "is completed"
            }
        }
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{id}")
def delete_task(id: int):
    if id in tasks:
        tasks[id].delete()
        return 'Task deleted'
    raise HTTPException(status_code=400, detail="Task not found")

