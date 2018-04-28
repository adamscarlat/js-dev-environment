//schema for fake data for API mocking
export const schema = {
    "type": "object",
    "properties": {
      "users": {
        "type": "array",
        "minItems": 3,
        "maxItems": 5,
        "items": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number",
              "unique": true,
              "minimum": 1
            },
            "title": {
              "type": "string",
              "faker": "name.firstName"
            },
            "author": {
              "type": "string",
              "faker": "name.lastName"
            },
            "genre": {
              "type": "string",
              "faker": "internet.email"
            }
          },
          "required": ["id", "title", "author", "genre"]
        }
      }
    },
    "required": ["users"]
  };
