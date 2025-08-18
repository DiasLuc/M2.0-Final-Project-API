const dayjs = require('dayjs');
const { intervals } = require('./data');

function scheduleReviews(startDate) {
  let reviews = [];
  let date = dayjs(startDate);
  for (let i = 0; i < intervals.length; i++) {
    date = date.add(intervals[i], 'day');
    reviews.push({
      scheduledDate: date.format('YYYY-MM-DD'),
      actualCompletionDate: null
    });
  }
  return reviews;
}

function shiftReviews(reviews, startIndex, newDate) {
  let date = dayjs(newDate);
  for (let i = startIndex; i < reviews.length; i++) {
    date = date.add(intervals[i], 'day');
    reviews[i].scheduledDate = date.format('YYYY-MM-DD');
    reviews[i].actualCompletionDate = null;
  }
  return reviews;
}

module.exports = {
  scheduleReviews,
  shiftReviews
};
