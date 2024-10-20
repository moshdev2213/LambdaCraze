const { ObjectId } = require('mongodb');
const { getTodosCollection } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async (event) => {
  try {
    // Access todoId from pathParameters
    const todoId = event.id ? event.id : null;

    // Validate todoId
    if (!todoId) {
      return {
        code: 400,
        success: false,
        data: { message: 'Invalid ID: Todo ID is required' },
      };
    }
    
    const collection =await  getTodosCollection();
    const todo = await collection.findOne({ _id: new ObjectId(todoId) });

    if (!todo) {
      return {
        code: 404,
        success: false,
        data: { message: 'Todo not found' },
      };
    }

    return {
      code: 200,
      success: true,
      data: {
        message: "Successfully fetched todo",
        todo,
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
