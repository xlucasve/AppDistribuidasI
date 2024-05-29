const signIn = async (email, realNmae, nickname, photo) => {
  try {
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

    const response = await fetch(
      'https://movieplay-api.onrender.com/api/v1/auth/login',
      requestOptions,
    );
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};

export default signIn;
