const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createNote = async (event) => {

  const data = JSON.parse(event.body);

  const params = {
    TableName: 'notes',
    Item: {
      noteId: data.noteId,
      content: data.content,
      createAt: new Date().toString()
    },
  }

  try {
    await dynamoDb.put(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify({'Note created successfully: ': params.Item}),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({error: 'Could not create note'}),
    };
  };
}