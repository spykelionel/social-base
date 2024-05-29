const { serverResponses, bearerAuth } = require("./response.js");

const jobResponse = {
  title: "Fullstack developer needed at Netgink Corp",
  description: "Developer must understand SDLC",
};

const jobResponseWp = {
  title: { example: "Fullstack developer needed at Netgink Corp" },
  description: { example: "Developer must understand SDLC" },
};

const createJob = {
  tags: ["Job"],
  description: "Create a new Job in the system",
  operationId: "createJob",
  security: [
    {
      bearerAuth,
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          $ref: "#/components/schemas/createJobBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Job created successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: jobResponseWp,
          },
        },
      },
    },
    500: serverResponses[500],
    409: serverResponses[409],
  },
};

const deleteJob = {
  tags: ["Job"],
  description: "Delete a Job",
  operationId: "deleteJob",
  security: [
    {
      bearerAuth,
    },
  ],
  parameters: [
    {
      name: "job_id",
      in: "path",
      description: "Job ID",
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

const getAllJobs = {
  tags: ["Job"],
  description: "Get all Jobs in the system",
  operationId: "getAllJobs",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Jobs returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                example: [jobResponse, jobResponse],
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

const getSingleJob = {
  tags: ["Job"],
  description: "Get a Job",
  operationId: "getSingleJob",
  parameters: [
    {
      name: "job_id",
      in: "path",
      description: "Job's ID",
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
      description: "Jobs returned successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: jobResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const saveSingleJob = {
  tags: ["Job"],
  description: "save a Job",
  operationId: "saveSingleJob",
  parameters: [
    {
      name: "job_id",
      in: "path",
      description: "Job's ID",
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
      description: "Jobs saved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: jobResponseWp,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const deleteSavedJob = {
  tags: ["Job"],
  description: "delete a saved Job",
  operationId: "deleteSavedJob",
  parameters: [
    {
      name: "job_id",
      in: "path",
      description: "Job's ID",
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
      description: "Jobs saved successfully!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: jobResponseWp,
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

const updateSingleJob = {
  tags: ["Job"],
  description: "Update a Job in the system",
  operationId: "updateSingleJob",
  parameters: [
    {
      name: "job_id",
      in: "path",
      description: "Job's ID",
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
          $ref: "#/components/schemas/createJobBody",
        },
      },
    },
    required: true,
  },
  responses: {
    201: {
      description: "Job!",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: jobResponse,
          },
        },
      },
    },
    401: serverResponses[401],
    404: serverResponses[404],
    500: serverResponses[500],
  },
};

const createJobBody = {
  type: "object",
  properties: {
    title: {
      type: "string",
      example: "Fullstack developer needed at Netgink Corp",
    },
    description: {
      type: "string",
      example: "Developer must understand SDLC",
    },
  },
};

const jobPaths = {
  "/jobs/create": {
    post: createJob,
  },
  "/jobs/": {
    get: getAllJobs,
  },
  "/jobs/{job_id}": {
    get: getSingleJob,
    patch: updateSingleJob,
    delete: deleteJob,
  },
  "/jobs/save/{job_id}": {
    put: saveSingleJob,
    delete: deleteSavedJob,
  },
};

const jobSchema = {
  createJobBody,
};

module.exports = { jobPaths, jobSchema };
