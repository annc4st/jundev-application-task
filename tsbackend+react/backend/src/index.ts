// import express,  {Request, Response, NextFunction} from "express";

// import cors from "cors";


// export const app = express();

// app.use(express.json());


// app.use(cors({
//   origin: 'http://localhost:5174',
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true,
//   optionsSuccessStatus: 200 // For legacy browser support
// }
// ));



// // Global error handler
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   console.error("🔥🖥️ Server error:", err.stack);
//   res.status(500).json({ message: 'Internal Server Error',  error: process.env.NODE_ENV === "development" ? err.message : undefined});
// });

// const PORT = process.env.PORT || 9000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

