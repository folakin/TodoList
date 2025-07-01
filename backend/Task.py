from datetime import datetime


class Task:
    def __init__(self, name, priority):
        self.id = 0
        self.name = name
        #self.desc = desc
        self.priority = priority
        self.creation = datetime.now()
        self.comp = False
        self.active = True
        pass
    def delete(self):
        self.active = False
        return
    def update(self, desc):
        self.desc = desc
        return
    def complete(self):
        self.comp = True
        return
    def to_dict(self):
        return {
            "name": self.name,
            "priority": self.priority,
            "creation_time": self.creation.isoformat(),
            "completed": self.comp
        }

    
    