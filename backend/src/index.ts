import express  from "express";
import taskRouter from "./routes.ts";


const app = express();

app.use(express.json());
app.use('/api/tasks', taskRouter);

const PORT = process.env.PORT || 9000;




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

