import http from "k6/http";
import { sleep, check } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
export const errorRate = new Rate("errors");
export const responseTime = new Trend("response_time");

// Test configuration
export const options = {
  stages: [
    { duration: "10s", target: 5 },   // Ramp up to 5 users
    { duration: "20s", target: 10 }, // Hold at 10 users
    { duration: "10s", target: 0 },  // Ramp down to 0 users
  ],
  thresholds: {
    errors: ["rate<0.01"],              // Less than 1% errors
    response_time: ["p(95)<500"],       // 95% of responses < 500ms
    "http_req_duration": ["avg<400"],  // Average request duration < 400ms
  },
};

export default function () {
  const baseUrl = "http://localhost:3000"; // Replace with your actual API base URL

  // Dynamic user data
  const randomId = Math.floor(Math.random() * 10000); // To avoid duplicate registrations
  const email = `user${randomId}@example.com`;
  const password = "password123!";

  // Step 1: Register a new user
  const registerPayload = JSON.stringify({
    email: email,
    forename: "Test",
    surname: "User",
    password: password,
    nationalityId: 1,
  });

  const registerHeaders = { "Content-Type": "application/json" };
  const registerRes = http.post(`${baseUrl}/users`, registerPayload, {
    headers: registerHeaders,
  });

  // Validate registration response
  check(registerRes, {
    "register status is 201": (r) => r.status === 201,
    "register response time < 400ms": (r) => r.timings.duration < 400,
  }) || errorRate.add(1);

  // Record registration response time
  responseTime.add(registerRes.timings.duration);

  // Step 2: Login with the registered user
  const loginPayload = JSON.stringify({
    email: email,
    password: password,
  });

  const loginRes = http.post(`${baseUrl}/auth/login`, loginPayload, {
    headers: registerHeaders,
  });

  // Validate login response
  check(loginRes, {
    "login status is 200": (r) => r.status === 200,
    "login response time < 400ms": (r) => r.timings.duration < 400,
  }) || errorRate.add(1);

  // Record login response time
  responseTime.add(loginRes.timings.duration);

  sleep(1); // Simulate user think time
}
