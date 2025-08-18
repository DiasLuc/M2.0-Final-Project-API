const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');

const intervals = [1, 2, 3, 7, 15];

function generateReviews(startDate, completedCount = 0, missedIndexes = []) {
  let reviews = [];
  let date = dayjs(startDate);
  for (let i = 0; i < intervals.length; i++) {
    date = date.add(intervals[i], 'day');
    reviews.push({
      scheduledDate: date.format('YYYY-MM-DD'),
      actualCompletionDate: (i < completedCount && !missedIndexes.includes(i))
        ? date.format('YYYY-MM-DD')
        : (missedIndexes.includes(i) && i < completedCount)
          ? date.add(1, 'day').format('YYYY-MM-DD') // completed late
          : null
    });
  }
  return reviews;
}

const topics = [
  {
    id: uuidv4(),
    name: "JavaScript Closures",
    notes: "Studied lexical scope and closure patterns.",
    createdAt: dayjs().subtract(20, 'day').format('YYYY-MM-DD'),
    reviews: generateReviews(dayjs().subtract(20, 'day'), 3)
  },
  {
    id: uuidv4(),
    name: "Express Routing",
    notes: "Learned about route parameters and middleware.",
    createdAt: dayjs().subtract(10, 'day').format('YYYY-MM-DD'),
    reviews: generateReviews(dayjs().subtract(10, 'day'), 2, [1]) // missed 2nd review, did it late
  },
  {
    id: uuidv4(),
    name: "REST API Design",
    notes: "",
    createdAt: dayjs().subtract(5, 'day').format('YYYY-MM-DD'),
    reviews: generateReviews(dayjs().subtract(5, 'day'), 1)
  },
  {
    id: uuidv4(),
    name: "Swagger Documentation",
    notes: "Practiced writing OpenAPI specs.",
    createdAt: dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
    reviews: generateReviews(dayjs().subtract(2, 'day'), 0)
  }
];

module.exports = { topics, intervals };
