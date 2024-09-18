// Importing specific clients from AWS SDK v3
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
  ScanCommand,
} = require("@aws-sdk/lib-dynamodb");
const { DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

// Create the DynamoDB Document client
const dynamoDbClient = new DynamoDBClient();
const dynamoDb = DynamoDBDocumentClient.from(dynamoDbClient);

const tableName = "Notes-dev";

module.exports.createNote = async (event) => {
  // Parse the incoming JSON body
  let data = JSON.parse(event.body);

  const params = {
    TableName: tableName,
    Item: {
      noteId: data.noteId,
      content: data.content,
      createAt: new Date().toISOString(),
    },
  };

  try {
    await dynamoDb.send(new PutCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Note created successfully",
        note: params.Item,
      }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};



module.exports.getNote = async (event) => {
  const params = {
    TableName: tableName,
    Key: {
      noteId: event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDb.send(new GetCommand(params));
    if (result.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "Note not found" }),
      };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch note" }),
    };
  }
};

module.exports.updateNote = async (event) => {
  let data;
  
  // Parse the incoming JSON body
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON format" }),
    };
  }

  const params = {
    TableName: tableName,
    Key: {
      noteId: event.pathParameters.id, // Get the noteId from the path
    },
    UpdateExpression: "set content = :content",
    ExpressionAttributeValues: {
      ":content": data.content, // Get the new content from the parsed body
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    const result = await dynamoDb.send(new UpdateCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Note with ID ${event.pathParameters.id} updated successfully`,
        updatedAttributes: result.Attributes,
      }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Could not update note with ID ${event.pathParameters.id}: ${error.message}` }),
    };
  }
};

module.exports.deleteNote = async (event) => {
  const params = {
    TableName: tableName,
    Key: {
      noteId: event.pathParameters.id,
    },
  };

  try {
    await dynamoDb.send(new DeleteCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Note deleted successfully" }),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not delete note" }),
    };
  }
};

module.exports.getAllNotes = async () => {
  const params = {
    TableName: tableName,
  };

  try {
    const result = await dynamoDb.send(new ScanCommand(params));
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Could not fetch notes" }),
    };
  }
};
