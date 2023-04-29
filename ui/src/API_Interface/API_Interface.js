import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    // Uncomment the following line if the API server runs on the same host as your UI server.
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;

//    axios.defaults.baseURL = `http://blue.cs.sonoma.edu:8100/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;

    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }


    async insertNewUser(newUserDictionary) {
        //const user_id = newUserDictionary.user_id;
        console.log(`API_Interface::insertNewUser: newUserDictionary contains: ${JSON.stringify(newUserDictionary )}`);
        return axiosAgent.post(`login`, newUserDictionary)
            .catch(error => console.error(error));
    }

    async updateStats(user_id, damage_done, healing_done) {

        return axiosAgent.put(`stats/${user_id}/${damage_done}/${healing_done}`);
    }

    async getUserRanks(user_id) {
        return axiosAgent.get(`stats/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async grabBeginnerQueue(role_id) {

        return axiosAgent.get(`queue/${role_id}`);
    }

    async grabIntermediateQueue(role_id) {

        return axiosAgent.get(`queue/${role_id}`);
    }

    async grabExpertQueue(role_id) {

        return axiosAgent.get(`queue/${role_id}`);
    }

}
