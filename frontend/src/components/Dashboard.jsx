import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const createProject = async (e) => {
    e.preventDefault();
    await API.post("/projects", { name });
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="container">
      <h2>Your Projects</h2>
      <form onSubmit={createProject}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project Name"
        />
        <button>Create Project</button>
      </form>
      <ul>
        {projects.map((proj) => (
          <li key={proj._id} onClick={() => navigate(`/project/${proj._id}`)}>
            {proj.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
