import mongoose from 'mongoose'

const connectDb = (uri) => {
  try {
    mongoose.connect(uri)
    console.log('Database connected successfully')
  }catch(err){
    console.log('error', err)
    process.exit(1)
  }
}
export default connectDb