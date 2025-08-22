const configLocal = JSON.parse(open('../config/config.local.json'))

export function getBaseURL() {
   return __ENV.BASE_URL || configLocal.baseURL
}