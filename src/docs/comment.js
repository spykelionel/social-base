const { serverResponses, bearerAuth } = require("./response.js");

const commentResponse = {
  comment_id: { example: "ae230tyhmna3tafgd" },
  body: { example: "Some descriot" },
};

const commentResponseWp = {
  comment_id: { example: "ae230tyhmna3tafgd" },
  body: { example: "Some descriot" },
};

const createComment = {
  tags: ["Comment"],
  description: "Create a new Comment in the system",
  operationId: "createComment",
  security: [
    {
      bearerAuth,
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createCommentBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Comment created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: commentResponseWp,
          },
        },
      },
    },
    500: serverResponses[500],
    501: serverResponses[501],
    409: serverResponses[409],
  },
};

const deleteComment = {
  tags: ["Comment"],
  description: "Delete a Comment",
  operationId: "deleteComment",
  security: [
    {
      bearerAuth,
    },
  ],
  parameters: [
    {
      name: "comment_id",
      in: "path",
      description: "Comment ID",
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

const getAllComments = {
  tags: ["Comment"],
  description: "Get all Comments in the system",
  operationId: "getAllComments",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Comments returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                example: [commentResponse, commentResponse],
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

const getSingleComment = {
  tags: ["Comment"],
  description: "Get a Comment",
  operationId: "getSingleComment",
  parameters: [
    {
      name: "comment_id",
      in: "path",
      description: "Comment's ID",
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
      description: "Comments returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: commentResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const updateSingleComment = {
  tags: ["Comment"],
  description: "Update a Comment in the system",
  operationId: "updateSingleComment",
  parameters: [
    {
      name: "comment_id",
      in: "path",
      description: "Comment's ID",
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
          $ref: "#/components/schemas/createCommentBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Comment!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: commentResponse,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const likeSingleComment = {
  tags: ["Comment"],
  description: "like a Comment",
  operationId: "likeSingleComment",
  parameters: [
    {
      name: "comment_id",
      in: "path",
      description: "Comment's ID",
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
      description: "Comments saved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: commentResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const deletelikedComment = {
  tags: ["Comment"],
  description: "delete a like from a Comment",
  operationId: "deletelikedComment",
  parameters: [
    {
      name: "comment_id",
      in: "path",
      description: "Comment's ID",
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
      description: "Comments saved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: commentResponseWp,
          },
        },
      },
    },
    204: serverResponses[204],
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const createCommentBody = {
  type: "object",
  properties: {
    postId: {
      type: "string",
      description: "Author of the Comment",
      example: "_ea2344ygfvdft943io",
    },
    body: {
      type: "string",
      example: "I love rainy dqays",
    },
  },
};

const commentPaths = {
  "/comments/create": {
    post: createComment,
  },
  "/comments/": {
    get: getAllComments,
  },
  "/comments/{comment_id}": {
    get: getSingleComment,
    patch: updateSingleComment,
    delete: deleteComment,
  },
  "/comments/like/{comment_id}": {
    put: likeSingleComment,
    delete: deletelikedComment,
  },
};

const commentSchema = {
  createCommentBody,
};

module.exports = { commentPaths, commentSchema };
