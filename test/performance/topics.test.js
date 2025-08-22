import http from 'k6/http';
import { sleep, check } from 'k6';
import { getBaseURL } from './utils/variables.js'
export const options = {
  stages: [
        {duration: '5s', target: 10},
        {duration: '20s', target: 100},
        {duration: '5s', target: 0},
    ],

    thresholds: {
        http_req_duration: ['p(95)<100', 'max<1000'],
        http_req_failed: ['rate<0.01']
    }
};

export default function() {
  const url = getBaseURL() + '/topics'
  const payload = JSON.stringify({
    name: "new topic", 
    notes: "notes for new topic"
  })

  const params = {
    headers: {
    'Content-Type': 'application/json',
    },
  }
  let res = http.post(url, payload, params)
  check(res, { "status is 201": (res) => res.status === 201 });
  sleep(1);
};
