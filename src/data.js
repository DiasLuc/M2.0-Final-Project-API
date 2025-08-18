const { topics, intervals } = require('./seed');

let topicStore = JSON.parse(JSON.stringify(topics)); // deep copy for mutability

module.exports = {
  topicStore,
  intervals
};
