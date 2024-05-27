const signIn = async (email, realNmae, nickname, photo) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify({
    userEmail: email,
    realName: realNmae,
    nickname: nickname,
    profilePictureLink: photo,
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch('https://movieplay-api.onrender.com/api/v1/auth/login', requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.error(error));
};

export default signIn;
