import { useEffect, useState } from "react";
import { api } from "../api";

import {
    Box,
    Container,
    CardHeader,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

interface Task {
    id: number;
    title: string;
    description?: string;
    status: "NEW" | "IN-PROGRESS" | "DONE";
    dueDate?: string;
}

export const Tasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);


    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get<Task[]>("/tasks");
                // console.log("Fetched tasks:", response.data);
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    const TaskStatus = ({
        status,
    }: {
        status: "NEW" | "IN-PROGRESS" | "DONE";
    }) => {
        const getBgColor = () => {
            switch (status) {
                case "NEW":
                    return "#aee9f0ff";
                case "IN-PROGRESS":
                    return "#fff3e0";
                case "DONE":
                    return "#c8e6c9";
                default:
                    return "#f5f5f5";
            }
        };
        return (
            <Typography
                sx={{
                    backgroundColor: getBgColor(),
                    px: 1.5,
                    py: 0.5,
                    borderRadius: "4px",
                    fontWeight: 500,
                    display: "inline-block",
                    marginBottom: 2,
                    marginLeft: 2,
                }}
            >
                {status}
            </Typography>
        );
    };

    return (
        <>
            <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>

                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        color: "blueviolet",
                        fontFamily: "Sans-serif",
                        fontWeight: "400",
                    }}
                >
                    List of tasks
                </Typography>

                <Box
                    sx={{ bgcolor: "#cfe8fc", padding: 2, marginTop: 2, borderRadius: 2 }}
                >
                    {tasks.map((task) => (
                        <Card
                            sx={{
                                minWidth: 275,
                                marginBottom: 2,
                                backgroundColor: "#efece2ff",
                                maxWidth: 375,
                            }}
                            key={task.id}
                        >
                            <CardHeader
                                title={task.title}
                                subheader={`⏰ ${task.dueDate
                                    ? `Due: ${new Date(task.dueDate).toLocaleDateString()}`
                                    : "No due date"
                                    }`}
                            />

                            <CardContent>
                                {task.description && (
                                    <Typography>{task.description}</Typography>
                                )}
                            </CardContent>

                            <TaskStatus status={task.status} />
                        </Card>
                    ))}
                </Box>
            </Container>
        </>
    );
};
