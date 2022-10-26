const API_KEY = "AIzaSyCRYrVhJoaW0yinGmIi-MR9GMOzWBpaTZg";

export class FetchAPI {
  static async login(requestBody) {
    let response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    let userInfo = await response.json();
    return userInfo;
  }
  static async resetPassword(requestBody) {
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
  }
  static async createNewUser(requestBody) {
    let response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
    let newUserInfo = await response.json();
    return newUserInfo;
  }
  static async sendEmailVerification(requestBody) {
    await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
      }
    );
  }
  static async getUserInfo(requestBody) {
    let response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        "Content-Type": "application/json",
      }
    );
    let userInfo = await response.json();
    return userInfo;
  }
  static async exchangeRefreshToken(requestBody) {
    let response = await fetch(
      `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
        "Content-Type": "application/json",
      }
    );
    let newTokens = await response.json();
    return newTokens;
  }
}
