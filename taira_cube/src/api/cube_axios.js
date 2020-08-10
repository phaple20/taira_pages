import axios from "axios";

axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

export function cube_get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(response => {
        switch (response.status) {
          case 200:
            if (response.data !== "") {
              resolve(response.data);
            }
            break;
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
