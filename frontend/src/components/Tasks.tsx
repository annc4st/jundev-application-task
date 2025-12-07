import { useEffect, useState } from 'react'
import { api } from '../api';


interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'NEW' | 'IN-PROGRESS' | 'DONE';
    dueDate?: string;
}

export const Tasks = () => {

    const [tasks, setTasks] = useState<Task[]>([]);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get<Task[]>('/tasks');
                console.log('Fetched tasks:', response.data);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }

        }
        fetchTasks();

    }, []);


    return (
        <div>
            <h1>Tasks</h1>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <h2>{task.title}</h2>
                        {task.description && <p>{task.description}</p>}
                        <p>{task.status}</p>
                        {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
                    </li>
                ))}
            </ul>

        </div>
    )
}
