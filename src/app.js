const express = require('express');
const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { topicStore, intervals } = require('./data');
const { scheduleReviews, shiftReviews } = require('./utils');

const app = express();
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add a Study Topic
app.post('/topics', (req, res) => {
  const { name, notes } = req.body;
  if (!name) return res.status(400).json({ error: "Topic name required" });
  const createdAt = dayjs().format('YYYY-MM-DD');
  const reviews = scheduleReviews(createdAt);
  const topic = { id: uuidv4(), name, notes: notes || "", createdAt, reviews };
  topicStore.push(topic);
  res.status(201).json(topic);
});

// List all topics
app.get('/topics', (req, res) => {
  res.json(topicStore);
});

// View Daily Review Schedule
app.get('/schedule', (req, res) => {
  const { date } = req.query;
  if (!date) return res.status(400).json({ error: "Date required" });
  const topics = topicStore.filter(topic =>
    topic.reviews.some(r => r.scheduledDate === date)
  );
  res.json(topics);
});

// Mark Review as Completed
app.post('/topics/:id/reviews/:date/complete', (req, res) => {
  const { id, date } = req.params;
  const { completionDate } = req.body;
  const topic = topicStore.find(t => t.id === id);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  const review = topic.reviews.find(r => r.scheduledDate === date);
  if (!review) return res.status(404).json({ error: "Review not found" });
  review.actualCompletionDate = completionDate || dayjs().format('YYYY-MM-DD');
  res.json(review);
});

// Handle Missed Reviews (auto-reschedule)
app.post('/topics/:id/reviews/:date/missed', (req, res) => {
  const { id, date } = req.params;
  const topic = topicStore.find(t => t.id === id);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  const idx = topic.reviews.findIndex(r => r.scheduledDate === date);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  // Reschedule missed review for next day
  const newDate = dayjs().add(1, 'day').format('YYYY-MM-DD');
  topic.reviews[idx].scheduledDate = newDate;
  topic.reviews[idx].actualCompletionDate = null;
  shiftReviews(topic.reviews, idx + 1, newDate);
  res.json(topic);
});

// Reschedule Reviews Manually
app.post('/topics/:id/reviews/:date/reschedule', (req, res) => {
  const { id, date } = req.params;
  const { newDate } = req.body;
  if (!newDate) return res.status(400).json({ error: "New review date required" });
  const topic = topicStore.find(t => t.id === id);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  const idx = topic.reviews.findIndex(r => r.scheduledDate === date);
  if (idx === -1) return res.status(404).json({ error: "Review not found" });
  topic.reviews[idx].scheduledDate = newDate;
  topic.reviews[idx].actualCompletionDate = null;
  shiftReviews(topic.reviews, idx + 1, newDate);
  res.json(topic);
});

// View Topic Details
app.get('/topics/:id', (req, res) => {
  const { id } = req.params;
  const topic = topicStore.find(t => t.id === id);
  if (!topic) return res.status(404).json({ error: "Topic not found" });
  res.json(topic);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running at http://localhost:${PORT}`);
  console.log(`Swagger UI at http://localhost:${PORT}/api-docs`);
});
