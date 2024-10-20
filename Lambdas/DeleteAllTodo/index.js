const { getTodosCollection } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async (event) => {
  try {
    const collection = await getTodosCollection();

    // Use deleteMany to delete all todos
    const result = await collection.deleteMany({}); // Empty filter to delete all documents

    if (result.deletedCount === 0) {
      return {
        code: 404,
        success: false,
        data: { message: 'No todos found to delete' },
      };
    }

    return {
      code: 200,
      success: true,
      data: {
        message: `Deleted ${result.deletedCount} todos successfully`,
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
