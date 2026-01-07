import {
    Formik,
    Form,
    Field,
    ErrorMessage,
    type FormikHelpers,
} from "formik";
import { object, string } from "yup";
import {
    Container,
    FormControl, FormGroup,
    Typography,
    Button,
    TextField,
} from "@mui/material";
import { api } from "../api";

interface Task {
    title: string;
    description: string;
    dueDate: string;
}

export const CreateTask: React.FC = () => {


    const initTaskValues: Task = {
        title: "",
        description: "",
        dueDate: new Date().toISOString().slice(0, 16),
    };


    const TaskSchema = object().shape({
        title: string().required("Task title is required"),
        description: string().required("Description is required"),
        dueDate: string()
            .required("Duedate is required")
            .test(
                "valid-date",
                "Please provide a valid dueDate and time",
                (value: string) => !isNaN(new Date(value || "").getTime())
            )
            .test("not-past-date", "DueDate cannot be in the past", (value: string) => {
                const selectedDate = new Date(value);
                return selectedDate >= new Date();
            })
    })


    const handleSubmit = async (values: Task, formikHelpers: FormikHelpers<Task>) => {
        try {
            const response = await api.post<Task>("/tasks", {
                ...values,
                dueDate: new Date(values.dueDate).toISOString(),
            });
            console.log("Task created:", response.data);
            alert("Task created successfully!");

            // Reset the form after submission
            formikHelpers.resetForm();

        } catch (error) {
            console.error("Error creating task:", error);
            alert("Failed to create task");
        }
    }

    return (
        <>
            <Container>
                <Typography variant="h4" sx={{ mb: 2 }}>Create task</Typography>

                <Formik
                    initialValues={initTaskValues}
                    validationSchema={TaskSchema}
                    onSubmit={handleSubmit}

                >
                    {({ isSubmitting }) => (

                        <Form>

                            <FormGroup>
                                <FormControl >
                                    <Field
                                        as={TextField}
                                        label="Title"
                                        id="title"
                                        name="title"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        sx={{ mb: 2 }}

                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        style={{ color: "red" }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <Field
                                        as={TextField}
                                        label="Description"
                                        id="description"
                                        name="description"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        sx={{ mb: 2 }}
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        style={{ color: "red" }}
                                    />
                                </FormControl>

                                <FormControl>
                                    <Field
                                        as={TextField}
                                        label="DueDate"
                                        type="datetime-local"
                                        id="dueDate"
                                        name="dueDate"
                                        fullWidth
                                        variant="outlined"
                                        required
                                        InputLabelProps={{ shrink: true }}
                                        sx={{ mb: 2 }}
                                    />
                                    <ErrorMessage
                                        name="dueDate"
                                        component="div"
                                        style={{ color: "red" }}
                                    />
                                </FormControl>

                                <Button type="submit" variant="contained"
                                    disabled={isSubmitting}
                                >Create Task</Button>
                            </FormGroup>

                        </Form>

                    )}
                </Formik >
            </Container >
        </>
    );
};
