const AuthService = {
  isAuth: () => sessionStorage.getItem("accessToken"),
};

export { AuthService };
export default AuthService;
