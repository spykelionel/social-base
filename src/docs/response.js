const serverResponses = {
  503: {
    description: "Service Unavailable",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal Server Error: Service Unavailable",
            },
          },
        },
      },
    },
  },
  501: {
    description: "Unimplemented",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal Server Error: Unimplemented",
            },
          },
        },
      },
    },
  },
  500: {
    description: "Internal Server Error",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Internal Server Error",
            },
          },
        },
      },
    },
  },
  401: {
    description: "Unauthorized",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Operation not authorized.",
            },
          },
        },
      },
    },
  },
  403: {
    description: "Forbidden, Access Denied",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "Forbidden. Access Denied",
            },
          },
        },
      },
    },
  },
  404: {
    description: "Resource not found",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "requested Resource not found",
            },
          },
        },
      },
    },
  },
  204: {
    description: "No content!",
    content: {
      "text/html": {
        schema: null,
      },
    },
  },
  409: {
    description: "Resource already exist",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Resource already exist",
            },
          },
        },
      },
    },
  },
  200: {
    description: "Operation successfully completed!",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: {
              type: "string",
              example: "operation successful!",
            },
          },
        },
      },
    },
  },
};
const bearerAuth = {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
};

module.exports = {
  serverResponses,
  bearerAuth,
};
