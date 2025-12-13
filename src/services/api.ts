import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = async (endpoint: string, limit?: number) => {
    try {
        const url = limit ? `${API_URL}/${endpoint}?_limit=${limit}` : `${API_URL}/${endpoint}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching data');
    }
};

export const createData = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${API_URL}/${endpoint}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error creating data');
    }
};

export const updateData = async (endpoint: string, id: number, data: any) => {
    try {
        const response = await axios.put(`${API_URL}/${endpoint}/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Error updating data');
    }
};

export const deleteData = async (endpoint: string, id: number) => {
    try {
        await axios.delete(`${API_URL}/${endpoint}/${id}`);
    } catch (error) {
        throw new Error('Error deleting data');
    }
};