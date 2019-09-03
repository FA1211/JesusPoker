export const checkFacebookToken = () => {
  let token = localStorage.getItem("django_token");
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/check-token/", {
    method: "get",
    headers: { Authorization: "Token " + token }
  }).then(response => {
    return response.json();
  });
};
