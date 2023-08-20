import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import authRouter from './routes/authRoutes.js';


const app = express();
const port = 8080;


app.use((req, res, next) => {
  console.log("New request made:");
  console.log("host: ", req.hostname);
  console.log("ip: ", req.ip);
  console.log("path: ", req.path);
  console.log("method: ", req.method);
  next();
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/auth", authRouter);

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  console.log(req.method);
  console.log(req.url);

  res.setHeader("Content-Type", "text/html");
  res.send("<h1>This is message!<h1>");
  res.end();
});

app.get("/health", (req, res) => {
  res.status(200).send("This is working or whatknot");
});

// app.use((req,res)=>{
//   res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
