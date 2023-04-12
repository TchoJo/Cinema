import axios from 'axios';

axios.interceptors.request.use((req) => {
   let token = sessionStorage["token"];
   req.headers = {'Authorization' : `Bearer ${token}`};
   return req;
})

const moviesAPI = "http://127.0.0.1:8000/api/movies";
const subsAPI = "http://127.0.0.1:8000/api/subs";
const membersAPI = "http://127.0.0.1:8000/api/members";

const getMovies = async () => {
   return axios.get(moviesAPI, { withCredentials : true});
}

const addMoive = async (newMovie) => {
   let emptyMovie = {filmName : "",
                     genres : "", 
                     image : ""}
         try {
      if(newMovie.filmName !== emptyMovie.filmName && newMovie.genres !== emptyMovie.genres){
         return axios.post(moviesAPI, newMovie);
      }
      else {
         return "Enter Movie Details."
      }
   } catch (error) {
      return `Couldn't Add ${newMovie.filmName}, try again.`
   } 
}

const updateMovie = async (id, updateMovie) => {
   try {
      return axios.put(`${moviesAPI}/${id}`, updateMovie);
   } catch (error) {
      return `Couldn't Update ${updateMovie.filmName}, try again.`
   } 
}

const removeMovie = async (id) => {
   try {
      return axios.delete(`${moviesAPI}/${id}`);
   } catch (error) {
      return "Could Not Delete Film."
   }
}

const getMembers = async () => {
   return axios.get(membersAPI);
}

const addMember = async (newMember) => {
   return axios.post(membersAPI, newMember);
}

const updateMember = async (id, updateMember) => {
   return axios.put(`${membersAPI}/${id}`, updateMember);
}

const removeMember = async (id) => {
   return axios.delete(`${membersAPI}/${id}`);
}


const getSubs = async () => {
   return axios.get(subsAPI, { withCredentials : true });
}

const addSub = async (newSub) => {
   return axios.post(subsAPI, newSub);
}
const utils = { getMovies, addMoive, updateMovie, removeMovie,
                getMembers, addMember, updateMember, removeMember,
                getSubs, addSub};

export default utils;