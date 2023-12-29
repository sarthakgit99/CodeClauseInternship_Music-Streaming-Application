import axios from "axios";
const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "8a54576896594fd8a8b43cb5e5d6472d";
const redirectUri = "http://localhost:3000";
const scopes = ["user-library-read", "playlist-read-private"];
export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
    baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(
        function (config) {
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        function (error) {
            console.log("Request error:", error);
            return Promise.reject(error);
        }
    );
};

export default apiClient;