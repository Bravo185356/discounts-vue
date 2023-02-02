const API_KEY = "AIzaSyCRYrVhJoaW0yinGmIi-MR9GMOzWBpaTZg";

export class AuthAPI {
  static async login(loginInputs) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email: loginInputs.email,
          password: loginInputs.password,
          returnSecureToken: true
        }),
      }
    );
    const userInfo = await response.json();
    if(!userInfo.error) {
      localStorage.setItem("accessToken", userInfo.idToken);
      localStorage.setItem("refreshToken", userInfo.refreshToken);
      return this.getUserInfo()
    }
  }
  static async resetPassword(email) {
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email,
        }),
      }
    );
  }
  static async createNewUser(registrationInputs) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          email:registrationInputs.email,
          password: registrationInputs.password,
          returnSecureToken: true,
        }),
      }
    );
    const newUserInfo = await response.json();
    if(!newUserInfo.error) {
      this.sendEmailVerification(newUserInfo.idToken)
    } else {
      return newUserInfo
    }
  }
  static async sendEmailVerification(idToken) {
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken,
        }),
      }
    );
  }
  static async getUserInfo() {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem('accessToken'),
        }),
        "Content-Type": "application/json",
      }
    );
    const userInfo = await response.json();
    if(userInfo.error) {
      await this.exchangeRefreshToken()
    }
    return userInfo;
  }
  static async exchangeRefreshToken() {
    const response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify({
          refresh_token: localStorage.getItem("refreshToken"),
          grant_type: "refresh_token",
        }),
        "Content-Type": "application/json",
      }
    );
    const newTokens = await response.json();
    if(newTokens.error) {
      console.log('Срок действия токенов истек, залогиньтесь заного')
      return
    } else {
      localStorage.setItem("accessToken", newTokens.id_token);
      localStorage.setItem("refreshToken", newTokens.refresh_token);
      this.getUserInfo()
    }
  }
}
