import Swal from 'sweetalert2'
let headers_without_token = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

export const getAllPlayerScores = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/playerscores/", {
    headers: headers_without_token
  }).then(response => response.json());
};

export const getCurrentPlayerScores = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/playercurrentscores/",
    { headers: headers_without_token }
  ).then(response => response.json());
};

export const getDetailPlayerScores = (name) => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/playerscores/get_individual?name="+name,
    { headers: headers_without_token }
  ).then(response => response.json());
}

export const getBestPlayerScores = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/playerscores/get_max",
    { headers: headers_without_token }
  ).then(response => response.json());
};

export const submitForm = form => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/forms/", {
    method: "post",
    headers: headers_without_token,
    body: JSON.stringify(form)
  }).then(response => {
    if (response.status === 201) {
      Swal.fire({
        title: 'Session Submitted',
        text: '',
        type: 'success',
        confirmButtonText: 'Cool',
        onClose: () => {window.location.reload()}
      })
      //window.location.reload();
    } else{
      Swal.fire({
        title: 'Submission failed',
        text: "Error Code: " + response.status +  ". If this keeps happening then contact Fadle :/",
        type: 'error',
        confirmButtonText: 'Cool'
      })
    }
  });
};

export const getAllSessions = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/sessions?ordering=-date",
    { headers: headers_without_token }
  ).then(response => response.json());
};

export const getDjangoToken = fb_access_token => {
  let login_body = {
    provider: "facebook",
    access_token: fb_access_token
  };
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/login/", {
    method: "post",
    body: JSON.stringify(login_body),
    headers: headers_without_token
  }).then(response => response.json());
};

export const getBiggestWin = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/sessionsresults?ordering=-result",
    { headers: headers_without_token }
  )
    .then(response => response.json())
    .then(data => data.filter(res => res["session"] !== "2019-01-01"));
};

export const getBiggestLoss = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/sessionsresults?ordering=result",
    { headers: headers_without_token }
  )
    .then(response => response.json())
    .then(data => data.filter(res => res["session"] !== "2019-01-01"));
};

export const getSessionSum = () => {
  return fetch(
    process.env.REACT_APP_BACKEND_URL + "/api/sessionsresults",
    { headers: headers_without_token }
  )
    .then(response => response.json());
}
