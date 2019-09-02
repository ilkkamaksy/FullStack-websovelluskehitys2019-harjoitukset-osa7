import axios from 'axios';
const baseUrl = '/api/users';

const getUsers = async () => {
    const results = await axios.get(baseUrl);
    return results.data;
};

export default { getUsers };