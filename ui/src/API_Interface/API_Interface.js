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

    async insertIntoQueue(queueDictionary) {
        console.log(`API_Interface::insertIntoQueue: queueDictionary contains: ${JSON.stringify(queueDictionary)}`);
        return axiosAgent.post(`queue/insert`, queueDictionary)
            .catch(error => console.error(error));
    }


    async removeFromQueues(user_id) {
        // console.log(`API_Interface::removeFromQueues`);
        return axiosAgent.post(`queue/remove/${user_id}`, {user_id})
            .catch(error => console.error(error));
    }

    async removeMultipleFromQueues(user_ids) {
        // console.log(`API_Interface::removeFromQueues`);
        user_ids.forEach((user_id) => {axiosAgent.post(`queue/remove/${user_id}`, {user_id})
            .catch(error => console.error(error));
        });
    }

    async updateStats(user_id, damage_done, healing_done) {
        return axiosAgent.put(`stats/${user_id}/${damage_done}/${healing_done}`);
    }

    async updateWin(user_id, role) {
        const data = { user_id, role };
        return axiosAgent.put(`stats/winner`, data);
    }

    async updateGame(user_id, role) {
        const data = { user_id, role };
        return axiosAgent.put(`stats/loser`, data);
    }

    async addRank(user_id, role) {
        return axiosAgent.put(`queue/${user_id}/${role}/addRank`);
    }

    async subtractRank(user_id, role) {
        return axiosAgent.put(`queue/${user_id}/${role}/subtractRank`)
    }

    async getUserRanks(user_id) {
        return axiosAgent.get(`stats/${user_id}/ranks`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async getUserStats(user_id) {
        return axiosAgent.get(`stats/${user_id}/stats`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async grabBeginnerQueue(role_id) {

        return axiosAgent.get(`queue/beginner/${role_id}`);
    }

    async grabIntermediateQueue(role_id) {

        return axiosAgent.get(`queue/intermediate/${role_id}`);
    }

    async grabExpertQueue(role_id) {

        return axiosAgent.get(`queue/expert/${role_id}`);
    }

    async startMatchmake(queueDictionary) {
        console.log(`API_Interface::startMatchmake: queueDictionary contains: ${JSON.stringify(queueDictionary)}`);
        return axiosAgent.post(`queue/matchmake`, queueDictionary)
            .then(mmInfo => mmInfo.data)
            .catch(error => console.error(error));
    }


}
