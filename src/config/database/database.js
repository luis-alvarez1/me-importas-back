import mongoose from 'mongoose';
import EnvModule from '../env/envModule';

EnvModule.configEnv();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log('DB CONECTADA');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default { connectDB };
