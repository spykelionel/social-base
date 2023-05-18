const { serverResponses, bearerAuth } = require("./response.js");

const likeResponse = {
  post_id: { example: "ae230tyhmna3tafgd" },
  body: { example: "Some descriot" },
};

const likeResponseWp = {
  post_id: { example: "ae230tyhmna3tafgd" },
  body: { example: "Some descriot" },
};

const createLike = {
  tags: ["Like"],
  description: "Create a new Like in the system",
  operationId: "createLike",
  security: [],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createLikeBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Like created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: likeResponseWp,
          },
        },
      },
    },
    500: serverResponses[500],
    409: serverResponses[409],
  },
};

const deleteLike = {
  tags: ["Like"],
  description: "Delete a Like",
  operationId: "deleteLike",
  security: [
    {
      bearerAuth,
    },
  ],
  parameters: [
    {
      name: "",
      in: "path",
      description: "Like ID",
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

const getAllLikes = {
  tags: ["Like"],
  description: "Get all Likes in the system",
  operationId: "getAllLikes",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Likes returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                example: [likeResponse, likeResponse],
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

const getSingleLike = {
  tags: ["Like"],
  description: "Get a Like",
  operationId: "getSingleLike",
  parameters: [
    {
      name: "",
      in: "path",
      description: "Like's ID",
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
      description: "Likes returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: likeResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const updateSingleLike = {
  tags: ["Like"],
  description: "Update a Like in the system",
  operationId: "updateSingleLike",
  parameters: [
    {
      name: "",
      in: "path",
      description: "Like's ID",
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
          $ref: "#/components/schemas/createLikeBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Like!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: likeResponse,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const createLikeBody = {
  type: "object",
  properties: {
    post_id: {
      type: "string",
      description: "ID of the post",
      example: "_ea2344ygfvdft943io!",
    },
  },
};

const likePaths = {
  "/likes/create": {
    Like: createLike,
  },
  "/likes/": {
    get: getAllLikes,
  },
  "/likes/{like_id}": {
    get: getSingleLike,
    patch: updateSingleLike,
    delete: deleteLike,
  },
};

const likeSchema = {
  createLikeBody,
};

module.exports = { likePaths, likeSchema };
