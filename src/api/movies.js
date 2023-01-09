import axios from 'axios';

export default axios.create({
    baseURL:'https://api.themoviedb.org',
    headers: {'Content-Type': 'application/json'}
});

export const axiosAuth = axios.create({
    baseURL:'http://localhost:3500',
    headers: {'Content-Type': 'application/json'},
    withCredentials: true
});


//npx json-server --watch data/db.json --port 3500