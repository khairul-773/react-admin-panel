import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchData = async (endpoint: string) => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
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