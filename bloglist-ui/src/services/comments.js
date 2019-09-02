import axios from 'axios';
const baseUrl = '/api/comments';

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const results = await axios.get(baseUrl);
    return results.data;
};

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const remove = async id => {
    const config = {
        headers: { Authorization: token }
    };

    await axios.delete(`${baseUrl}/${id}`, config);
};

export default { getAll, create, remove, setToken };