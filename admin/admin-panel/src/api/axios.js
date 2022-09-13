import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const instance = axios.create({
    baseURL: "http://localhost:5000/api"
});
