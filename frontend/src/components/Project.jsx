import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

const Project = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const fetchProject = async () => {
    const res = await API.get(`/projects/${projectId}`);
    setProject(res.data);
  };

  const createTask = async (e) => {
    e.preventDefault();
    await API.post(`/tasks/${projectId}`, { title, description: desc });
    setTitle("");
    setDesc("");
    fetchProject();
  };

  const updateTask = async (taskId, status) => {
    await API.put(`/tasks/${taskId}`, { status });
    fetchProject();
  };

  const deleteTask = async (taskId) => {
    await API.delete(`/tasks/${taskId}`);
    fetchProject();
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="container">
      <h2>{project.name}</h2>
      <form onSubmit={createTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
        />
        <button>Create Task</button>
      </form>
      <ul>
        {project.tasks?.map((task) => (
          <li key={task._id}>
            <strong>{task.title}</strong> - {task.status}
            <div className="task-buttons">
              <button onClick={() => updateTask(task._id, "in-progress")}>
                In Progress
              </button>
              <button onClick={() => updateTask(task._id, "completed")}>
                Complete
              </button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Project;
