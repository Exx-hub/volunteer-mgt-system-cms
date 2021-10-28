class UserProfileClass {
  user = undefined;
  credential = undefined;
  token = undefined;

  constructor() {
    const _credential = localStorage.getItem("credential");
    if (_credential && _credential !== "null") {
      this.credential = JSON.parse(localStorage.getItem("credential"));

      this.token = this.credential.token;
      this.user = this.credential.username;
    }
  }

  setCredential(data) {
    if (data) {
      localStorage.setItem("credential", JSON.stringify(data));
      if (localStorage.getItem("credential")) {
        this.credential = JSON.parse(localStorage.getItem("credential"));
        this.token = this.credential.token;
        this.user = this.credential.username;
      }
    }
  }

  getCredential() {
    return this.credential;
  }

  logout(User) {
    User.logout(this.token).then(this.clearData()).catch(this.clearData());
  }

  clearData() {
    localStorage.setItem("credential", null);
    this.token = null;
    this.user = null;
    this.credential = null;
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  getUserId = () => {
    if (this.user) {
      return this.user.displayId || undefined;
    }
    return undefined;
  };

  getUser_id = () => {
    if (this.user) {
      return this.user._id || undefined;
    }
    return undefined;
  };
}

export default UserProfileClass;
