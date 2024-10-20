const { getTodosCollection } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async () => {
  try {
    const collection = await  getTodosCollection();
    const todos = await collection.find({}).toArray();

    return {
      code: 200,
      success: true,
      data: {
        message:"success fetching todos",
        todos
      },
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: { error: error.message },
    };
  }
};