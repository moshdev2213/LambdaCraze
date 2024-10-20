const { MongoClient } = require('mongodb');
let cachedClient = null;

const connectToDb = async () => {
    try {
        // Check if cachedClient is already connected
        if (cachedClient) {
            return cachedClient;
        }
        // Create a new MongoClient and connect
        const client = new MongoClient(process.env.MONGO_URI);

        await client.connect();
        cachedClient = client;

        console.log('Successfully connected to MongoDB');
        return cachedClient;
    } catch (error) {
        if (cachedClient) {
            await cachedClient.close(); // Close the client if it was created
        }
        console.error('Error connecting to MongoDB:', error.message);
        throw new Error('Failed to connect to MongoDB');
    }
};

const getTodosCollection = async () => {
    const dbClient = await connectToDb();
    return dbClient.db(process.env.DB_NAME).collection(process.env.MONGO_COLLECTION);
};

module.exports = {
    connectToDb,
    getTodosCollection,
};