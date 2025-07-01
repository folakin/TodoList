from fastapi import FastAPI, HTTPException
from Task import Task
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime

app = FastAPI()

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

@app.get("/tasks")
def get_tasks():
    return [task.to_dict() for task in tasks.values()]

@app.post("/tasks")
def add_tasks(task: TaskRequest):
    global next_id
    nt = Task(task.name, task.priority)
    nt.id = next_id
    next_id += 1
    tasks[nt.id] = nt
    return {'Task created': nt.to_dict() }

@app.put("/tasks/{next_id}")
def comp(next_id: int):
    if next_id in tasks:
        tasks[next_id].complete()
        return {
            "message": "Task marked as complete",
            "task": {
                "id": next_id,
                "name": tasks[next_id].name,
                "status": "is completed"
            }
        }
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{next_id}")
def delete_task(next_id: int):
    if next_id in tasks:
        tasks[next_id].delete()
        return 'Task deleted'
    raise HTTPException(status_code=400, detail="Task not found")

