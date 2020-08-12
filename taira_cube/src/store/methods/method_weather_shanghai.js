import { cube_get } from "../../api/cube_axios";

export function weather_data(weaid, week) {
  return cube_get(
    "http://api.k780.com/?app=weather.realtime&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json",
    {
      weaid: weaid,
      ag: week
    }
  );
}
