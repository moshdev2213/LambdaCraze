const { ObjectId } = require('mongodb');
const { getTodosCollection } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async (event) => {
  try {

    const todoId = event.id;
    const updatedTodo = event.body;
    console.log(event)

    // Check if todoId and updatedTodo are valid
    if (!todoId || !ObjectId.isValid(todoId)) {
      return {
        statusCode: 400,
        success: false,
        data: { message: 'Invalid or missing todo ID' },
      };
    }

    // Check if updatedTodo is an object and not empty
    if (!updatedTodo || typeof updatedTodo !== 'object' || Object.keys(updatedTodo).length === 0) {
      return {
        statusCode: 400,
        success: false,
        data: { message: 'Invalid or empty updated data' },
      };
    }

    const collection =await getTodosCollection();
    const result = await collection.updateOne(
      { _id: new ObjectId(todoId) },
      { $set: updatedTodo }
    );

    if (result.matchedCount === 0) {
      return {
        code: 404,
        success: false,
        data: { message: 'Todo not found' },
      };
    }

     // Fetch the updated todo object from the database
    const updatedTodoObj = await collection.findOne({ _id: new ObjectId(todoId) });

    return {
      statusCode: 200,
      success: true,
      data: {
        message: 'Todo updated successfully',
        todo: updatedTodoObj // Return the updated todo object
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