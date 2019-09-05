
let headers_without_token = {
  "Accept": "application/json",
  "Content-Type": "application/json"
}

export const getAllPlayerScores = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/playerscores/", {headers:headers_without_token})
    .then(response => response.json())
};

export const getBestPlayerScores = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/playerscores/get_max", {headers:headers_without_token})
    .then(response => response.json())
    }

export const submitForm = (form) => {
  console.log(form)
  fetch(process.env.REACT_APP_BACKEND_URL + "/api/forms/", {
    method: "post",
    headers: headers_without_token,
    body: JSON.stringify(form)
  }).then(response => {
    if (response.status === 201) {
      alert("Session Submitted");
      window.location.reload();
    } else if (response.status === 500) {
      console.log(response)
      alert("Failed! If this keeps happening then contact Fadle :/");
    }
  });
};

export const getAllSessions = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/sessions?ordering=-date", {headers:headers_without_token})
    .then(response => response.json())
};

export const getDjangoToken = fb_access_token => {
    let login_body = {
      provider: "facebook",
      access_token: fb_access_token
    };
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/login/", {
      method: "post",
      body: JSON.stringify(login_body),
      headers:headers_without_token
    })
      .then(response => response.json())
  };