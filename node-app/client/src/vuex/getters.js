const getters = {
    username: state => state.User.username,
    token: state => state.User.token,
    avatar: state => state.User.avatar,
    email: state => state.User.email,
    userData: state => state.User.userData
  };
  export default getters
  