import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

// leaders
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading());
  return fetch(baseUrl + 'leaders')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};
const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING
});
const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});
const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// pets
export const fetchPets = () => (dispatch) => {
  dispatch(petsLoading());
  return fetch(baseUrl + 'pets')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(pets => dispatch(addPets(pets)))
    .catch(error => dispatch(petsFailed(error.message)));
};
const petsLoading = () => ({
  type: ActionTypes.PETS_LOADING
});
const petsFailed = (errmess) => ({
  type: ActionTypes.PETS_FAILED,
  payload: errmess
});
const addPets = (pets) => ({
  type: ActionTypes.ADD_PETS,
  payload: pets
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const postComment = (petId, rating, author, comment) => (dispatch) => {
  var newcmt = { petId: petId, rating: rating, author: author, comment: comment, date: new Date().toISOString() };
  setTimeout(() => {
    dispatch(addComment(newcmt));
  }, 2000);
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt
});

// promotions
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading());
  return fetch(baseUrl + 'promotions')
    .then(response => {
      if (!response.ok) throw Error('Error ' + response.status + ': ' + response.statusText);
      else return response.json();
    })
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};
const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});
const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});
const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// favorites
export const postFavorite = (petId) => (dispatch) => {
  setTimeout(() => {
    dispatch(addFavorite(petId));
  }, 2000);
};
const addFavorite = (petId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: petId
});