const { serverResponses, bearerAuth } = require("./response.js");

const userResponse = {
  firstname: "John",
  lastname: "Snow",
  email: "john.snow@email.com",
};

const userResponseWp = {
  firstname: { example: "John" },
  lastname: { example: "Snow" },
  email: { example: "john.snow@email.com" },
};

const createUser = {
  tags: ["User"],
  description: "Create a new use in the system",
  operationId: "createUser",
  security: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: userResponseWp,
          },
        },
      },
    },
    500: serverResponses[500],
    409: serverResponses[409],
  },
};

const authUser = {
  tags: ["User"],
  description: "Authenticate a new user",
  operationId: "authUser",
  security: [{}],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/authUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User session created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: {
                type: "string",
                example:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF92ZW5kb3IiOjEsIm5hbWUiOiJ5dGUiLCJwaG9uZSI6IjMyNDYiLCJzdWJuYW1lIjoiU3B5a2UiLCJlbWFpbCI6InNhZUBnbWFpbC5jb20iLCJsb2NhdGlvbiI6IjIzNyIsImRhdGVfaW5zY3JpcHRpb24iOiIyMDIzLTAxLTA0IDE3OjI4OjIwLjA2OCIsInBhc3N3b3JkIjoiJDJiJDEwJG44ZFR5TVJVd0Y5SVh2bTJXY25kcGVTaDh1eFNNaTBKaDNqRDBrclU5SjNqL0tad2ZQbThPIiwiaWF0IjoxNjczNTQzMDA2LCJleHAiOjE2NzM2Mjk0MDZ9.AE8cQU2b5aOTf7D968BJ3_O-t9EJYYxd3iy6jRVPYH8",
              },
              created_at: {
                type: "date",
                example: "2023-01-04 17:28:20.068",
              },
            },
          },
        },
      },
    },
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const deleteUser = {
  tags: ["User"],
  description: "Delete a user",
  operationId: "deleteUser",
  security: [
    {
      bearerAuth,
    },
  ],
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "User ID",
      required: true,
      type: "string",
    },
  ],
  responses: {
    204: serverResponses[204],
    500: serverResponses[500],
    401: serverResponses[401],
    409: serverResponses[409],
  },
};

const getAllUsers = {
  tags: ["User"],
  description: "Get all users in the system",
  operationId: "getusers",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Users returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                example: [userResponse, userResponse],
              },
            },
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const getSingleUser = {
  tags: ["User"],
  description: "Get a user",
  operationId: "getSingleUser",
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "user's ID",
      required: true,
      type: "int",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Users returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: userResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const updateSingleUser = {
  tags: ["User"],
  description: "Update a user in the system",
  operationId: "updateSingleUser",
  parameters: [
    {
      name: "user_id",
      in: "path",
      description: "user's ID",
      required: true,
      type: "int",
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createUserBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "User!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: userResponse,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const createUserBody = {
  type: "object",
  properties: {
    firstname: {
      type: "string",
      example: "John",
    },
    lastname: {
      type: "string",
      example: "Snow",
    },
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      description: "unencrypted user's password",
      example: "test123Q!",
    },
  },
};

const authUserBody = {
  type: "object",
  properties: {
    email: {
      type: "string",
      example: "john.snow@email.com",
    },
    password: {
      type: "string",
      example: "test123Q!",
    },
  },
};

const userPaths = {
  "/users/create": {
    post: createUser,
  },
  "/users/auth/login": {
    post: authUser,
  },
  "/users/": {
    get: getAllUsers,
  },
  "/users/{user_id}": {
    get: getSingleUser,
    patch: updateSingleUser,
    delete: deleteUser,
  },
};

const userSchema = {
  createUserBody,
  authUserBody,
};

module.exports = { userPaths, userSchema };
