import http from "k6/http";
import { sleep, check } from "k6";
import { Rate, Trend, Counter } from "k6/metrics";

// Custom metrics
export const errorRate = new Rate("errors");
export const responseTime = new Trend("response_time");
export const successfulRequests = new Counter("successful_requests");

// Test configuration
export const options = {
  stages: [
    { duration: "10s", target: 5 },   // Ramp-up to 5 users
    { duration: "20s", target: 10 }, // Hold at 10 users
    { duration: "10s", target: 0 },  // Ramp-down to 0 users
  ],
  thresholds: {
    errors: ["rate<0.01"],              // Less than 1% errors allowed
    response_time: ["p(95)<500"],       // 95% of requests must be <500ms
    "http_req_duration": ["avg<400"],  // Average request duration should be <400ms
  },
};

export default function () {
  // Test `/trips` endpoint
  const tripsRes = http.get("http://localhost:3000/trips?userId=1");
  check(tripsRes, {
    "trips status is 200": (r) => r.status === 200,
    "trips response time < 400ms": (r) => r.timings.duration < 400,
  }) || errorRate.add(1);

  // Record response time for `/trips`
  responseTime.add(tripsRes.timings.duration);

  // Increment success counter for valid responses
  if (tripsRes.status === 200) {
    successfulRequests.add(1);
  }

  sleep(1);

  // Test `/countries` endpoint
  const countriesRes = http.get("http://localhost:3000/countries");
  check(countriesRes, {
    "countries status is 200": (r) => r.status === 200,
    "countries response time < 400ms": (r) => r.timings.duration < 400,
  }) || errorRate.add(1);

  // Record response time for `/countries`
  responseTime.add(countriesRes.timings.duration);

  if (countriesRes.status === 200) {
    successfulRequests.add(1);
  }

  sleep(1);

  // Simulate accessing a specific country
  const randomCountryId = Math.floor(Math.random() * 10) + 1; // Assuming country IDs 1-10
  const countryRes = http.get(`http://localhost:3000/countries/${randomCountryId}`);
  check(countryRes, {
    [`country ${randomCountryId} status is 200`]: (r) => r.status === 200,
    [`country ${randomCountryId} response time < 400ms`]: (r) => r.timings.duration < 400,
  }) || errorRate.add(1);

  if (countryRes.status === 200) {
    successfulRequests.add(1);
  }

  sleep(1);
}
