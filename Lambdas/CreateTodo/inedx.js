const { getTodosCollection } = require('/opt/nodejs/db'); // Import from the Lambda Layer

exports.handler = async (event) => {
  try {
    
    console.log('Received event:', JSON.stringify(event)); // Log the entire event for debugging

    // Check if event.body is defined
    if (!event) {
      return {
        code: 400,
        success: false,
        data: { message: 'Request body is required' },
      };
    }

    let newTodo=event
     // Validate the required attributes
    if (!newTodo.title || !newTodo.description || !newTodo.dueDate || typeof newTodo.completed !== 'boolean') {
      return {
        code: 400,
        success: false,
        data: { message: 'Invalid input: title, description, dueDate, and completed are required' },
      };
    }
    
    const collection = await getTodosCollection();
    const result = await collection.insertOne(newTodo);

    // Construct the complete todo object with the insertedId
    const createdTodo = { 
      _id: result.insertedId, 
      ...newTodo
    };

    return {
      code: 201,
      success: true,
      data: { 
        message: 'Todo created', 
        todo: createdTodo 
        
      }
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      data: { error: error.message },
    };
  }
};