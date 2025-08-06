import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
// chandrav306m
// oX6zS4CR8tq6tr09