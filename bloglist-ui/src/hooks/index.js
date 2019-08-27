import { useState } from 'react';
import axios from 'axios';

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const reset = () => {
        setValue('');
    };

    return {
        type,
        value,
        onChange,
        reset
    };
};

export const useResource = (baseUrl) => {

    const [resources, setResources] = useState([]);
    const [token, setAuthToken] = useState('');

    const setToken = newToken => {
        setAuthToken(`bearer ${newToken}`);
    };

    const getAll = async () => {
        const response = await axios.get(baseUrl);
        setResources(response.data);
    };

    const create = async newObject => {
        const config = {
            headers: { Authorization: token },
        };
        const response = await axios.post(baseUrl, newObject, config);
        const newBlogs = resources.concat(response.data);
        setResources(newBlogs);
    };

    const update = async (id, newObject) => {
        const config = {
            headers: { Authorization: token }
        };

        await axios.put(`${baseUrl}/${id}`, newObject, config);
        const newBlogs = resources.map(blog => {
            if ( blog.id === newObject.id ) {
                return newObject;
            } else {
                return blog;
            }
        });
        setResources(newBlogs);
    };

    const remove = async id => {
        const config = {
            headers: { Authorization: token }
        };

        await axios.delete(`${baseUrl}/${id}`, config);
        const newBlogs = resources.filter(post => post.id !== id);
        setResources(newBlogs);
    };

    const service = {
        getAll,
        create,
        update,
        remove,
        setToken
    };

    return [
        resources,
        service
    ];
};