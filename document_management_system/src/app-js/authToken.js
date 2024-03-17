 const authToken = {
    getAccessToken: () => {
        let access_token = localStorage.getItem("access_token");
        return access_token;
        //  {
        // accessToken: localStorage.getItem("token"),
        // refreshToken: localStorage.getItem("rtoken"),
        // };
    },
    isAuthenticated: () => {
        let accessToken = localStorage.getItem("access_token");
        return accessToken;
    },
    setAccessToken: (access_token, refresh_token) => {
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
    },
    removeAccessToken: () => {
        localStorage.removeItem("access_token");
    }
}
export default authToken