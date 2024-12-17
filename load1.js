
import http from "k6/http";
import { sleep, check } from "k6";
import { Rate } from "k6/metrics";

export const errorRate = new Rate("errors");

export const options = {
    vus: 10,
    duration: "30s",
}

export default function () {
  const res = http.get("http://localhost:3000/trips");
  sleep(1);
  const checkRes = check(
    res,
    {
      "trips status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  );
/*
  const countries = http.get("http://localhost:3000/countries");
  check(
    countries,
    {
      "countries status is 200": (r) => r.status === 200,
    } || errorRate.add(1)
  ); */
}
 