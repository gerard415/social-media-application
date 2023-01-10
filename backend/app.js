require('dotenv').config()
require('express-async-errors');

const cors = require('cors')
const helmet = require('helmet')  //helps you secure your Express apps by setting various HTTP headers.
const morgan = require('morgan')
const path = require('path')


const express = require('express');
const app = express();

const authenticateUser = require('./middleware/authentication')

/* CONFIGURATIONS */
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const postsRouter = require('./routes/posts')


// error handlers
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', authenticateUser, userRouter)
app.use('/api/v1/posts', authenticateUser, postsRouter)


//errors
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//database
const connectDB = require('./db/connect');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
