// api/fleek-auth.js (Fleek serverless function)

exports.handler = async (event) => {
    const VALID_CODE = 'cogitoergosum';  // Same validation code
  
    // Only handle POST requests
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body); // Parse the incoming request body
  
      if (body.code === VALID_CODE) {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: 'Access granted' }),
        };
      } else {
        return {
          statusCode: 403,
          body: JSON.stringify({ message: 'Invalid code' }),
        };
      }
    } else {
      return {
        statusCode: 405,
        headers: { Allow: 'POST' },
        body: `Method ${event.httpMethod} Not Allowed`,
      };
    }
  };
  