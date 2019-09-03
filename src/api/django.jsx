let access_headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Token " + localStorage.getItem("django_token")
}


export const getAllPlayerScores = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/playerscores/")
    .then(response => response.json())
};

export const getBestPlayerScores = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/playerscores/get_max")
    .then(response => response.json())
    }

export const submitForm = (form) => {
  fetch(process.env.REACT_APP_BACKEND_URL + "/api/forms/", {
    method: "post",
    headers: access_headers,
    body: JSON.stringify(form)
  }).then(response => {
    if (response.status === 201) {
      alert("Session Submitted");
      window.location.reload();
    } else if (response.status === 500) {
      alert("Failed! If this keeps happening then contact Fadle :/");
    }
  });
};

export const getAllSessions = () => {
  return fetch(process.env.REACT_APP_BACKEND_URL + "/api/sessions?ordering=-date")
    .then(response => response.json())
};

export const getDjangoToken = fb_access_token => {
    let login_body = {
      provider: "facebook",
      access_token: fb_access_token
    };
    return fetch(process.env.REACT_APP_BACKEND_URL + "/api/auth/login/", {
      method: "post",
      headers: access_headers,
      body: JSON.stringify(login_body)
    })
      .then(response => response.json())
  };