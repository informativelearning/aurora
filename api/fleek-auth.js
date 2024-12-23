// api/fleek-auth.js
exports.handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
      return {
          statusCode: 405,
          body: JSON.stringify({
              message: 'Method not allowed'
          })
      };
  }

  try {
      const VALID_CODE = process.env.AUTH_CODE || 'cogitoergosum';  // Ideally use environment variable
      const { code } = JSON.parse(event.body);

      // Validate the code
      if (code === VALID_CODE) {
          return {
              statusCode: 200,
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  message: 'Access granted',
                  success: true
              })
          };
      } else {
          return {
              statusCode: 403,
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  message: 'Invalid code',
                  success: false
              })
          };
      }
  } catch (error) {
      return {
          statusCode: 500,
          body: JSON.stringify({
              message: 'Internal server error',
              success: false
          })
      };
  }
};