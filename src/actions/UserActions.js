import { LOGIN_REQUEST, LOGIN_SUCCES, LOGIN_FAIL } from '../constants/User';

export function handleLogin() {
  const permissions = {
    photos: 4,
  };

  return (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
    });
    window.VK.Auth.login((res) => {
      if (res.session) {
        const username = res.session.user.first_name;
        localStorage.setItem('username', username);
        dispatch({
          type: LOGIN_SUCCES,
          payload: username,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error('Ошибка авторизации'),
        });
      }
    }, permissions.photos);
  };
}

export function getLoginStatus() {
  return (dispatch) => {
    window.VK.Auth.getLoginStatus((res) => {
      console.log(res.session);
      if (res.session) {
        dispatch({
          type: LOGIN_SUCCES,
          payload: localStorage.getItem('username'),
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          error: true,
          payload: new Error('Пользователь не авторизован'),
        });
      }
    });
  };
}
