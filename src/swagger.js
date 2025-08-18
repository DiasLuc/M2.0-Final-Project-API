const { topicStore } = require('./data');

const exampleTopic = topicStore[0];
const exampleReview = exampleTopic.reviews[0];

module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Spaced-Review Study Planner API",
    version: "1.0.0",
    description: "API for scheduling and tracking study topic reviews using the Ebbinghaus forgetting curve."
  },
  servers: [
    { url: "http://localhost:3000" }
  ],
  paths: {
    "/topics": {
      post: {
        summary: "Add a Study Topic",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  notes: { type: "string" }
                },
                required: ["name"]
              },
              example: {
                name: "Node.js Streams",
                notes: "Studied readable and writable streams."
              }
            }
          }
        },
        responses: {
          "201": {
            description: "Topic added with scheduled review dates.",
            content: {
              "application/json": {
                example: exampleTopic
              }
            }
          }
        }
      },
      get: {
        summary: "List all topics",
        responses: {
          "200": {
            description: "List of all topics.",
            content: {
              "application/json": {
                example: topicStore
              }
            }
          }
        }
      }
    },
    "/schedule": {
      get: {
        summary: "View Daily Review Schedule",
        parameters: [
          {
            name: "date",
            in: "query",
            required: true,
            schema: { type: "string", format: "date" }
          }
        ],
        responses: {
          "200": {
            description: "Topics scheduled for review on the given date.",
            content: {
              "application/json": {
                example: topicStore.filter(t =>
                  t.reviews.some(r => r.scheduledDate === exampleReview.scheduledDate)
                )
              }
            }
          }
        }
      }
    },
    "/topics/{id}/reviews/{date}/complete": {
      post: {
        summary: "Mark Review as Completed",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "date", in: "path", required: true, schema: { type: "string", format: "date" } }
        ],
        requestBody: {
          required: false,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  completionDate: { type: "string", format: "date" }
                }
              },
              example: { completionDate: exampleReview.scheduledDate }
            }
          }
        },
        responses: {
          "200": {
            description: "Review marked as completed.",
            content: {
              "application/json": {
                example: { scheduledDate: exampleReview.scheduledDate, actualCompletionDate: exampleReview.scheduledDate }
              }
            }
          }
        }
      }
    },
    "/topics/{id}/reviews/{date}/missed": {
      post: {
        summary: "Handle Missed Reviews (auto-reschedule)",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "date", in: "path", required: true, schema: { type: "string", format: "date" } }
        ],
        responses: {
          "200": {
            description: "Updated schedule for the topic.",
            content: {
              "application/json": {
                example: exampleTopic
              }
            }
          }
        }
      }
    },
    "/topics/{id}/reviews/{date}/reschedule": {
      post: {
        summary: "Reschedule Reviews Manually",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } },
          { name: "date", in: "path", required: true, schema: { type: "string", format: "date" } }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  newDate: { type: "string", format: "date" }
                },
                required: ["newDate"]
              },
              example: { newDate: "2024-07-01" }
            }
          }
        },
        responses: {
          "200": {
            description: "Updated schedule for the topic.",
            content: {
              "application/json": {
                example: exampleTopic
              }
            }
          }
        }
      }
    },
    "/topics/{id}": {
      get: {
        summary: "View Topic Details",
        parameters: [
          { name: "id", in: "path", required: true, schema: { type: "string" } }
        ],
        responses: {
          "200": {
            description: "Scheduled reviews for the topic.",
            content: {
              "application/json": {
                example: exampleTopic
              }
            }
          }
        }
      }
    }
  }
};
