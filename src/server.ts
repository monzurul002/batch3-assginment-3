import app from './app';
import mongoose from 'mongoose';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.PORT, () => {
      console.log(`Example app listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
