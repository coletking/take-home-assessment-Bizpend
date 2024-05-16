import express, { Application } from 'express';
import router from './user/user.route';
import connectDB from './database/db.config';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
connectDB();
app.use('/users', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
