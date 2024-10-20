const { ObjectId } = require('mongodb');
const { getTodosCollection  } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async (event) => {
  try {

    const todoId = event.id;

    // Check if todoId are valid
    if (!todoId || !ObjectId.isValid(todoId)) {
      return {
        statusCode: 400,
        success: false,
        data: { message: 'Invalid or missing todo ID' },
      };
    }

    const collection = await getTodosCollection ();
    const result = await collection.deleteOne({ _id: new ObjectId(todoId) });

    if (result.deletedCount === 0) {
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
        message: 'Todo deleted successfully',
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
