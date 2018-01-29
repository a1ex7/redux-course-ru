import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from '../constants/Page';

let cached = false;
let photosArr = [];

function makeYearPhotos(photos, selectedYear) {
  const yearPhotos = [];

  photos.forEach((item) => {
    const createdYear = new Date(item.created * 1000).getFullYear();
    if (createdYear === selectedYear) {
      yearPhotos.push(item);
    }
  });

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

  return yearPhotos;
}

function getMorePhotos(offset, count, year, dispatch) {
  window.VK.Api.call('photos.getAll', { extended: 1, count, offset }, (r) => {
    console.log(r, offset, count);
    photosArr = photosArr.concat(r.response);
    offset += 200;
    try {
      if (offset < count) {
        getMorePhotos(offset, count, year, dispatch);
      } else {
        const photos = makeYearPhotos(photosArr, year);
        cached = true;
        dispatch({
          type: GET_PHOTOS_SUCCESS,
          payload: photos,
        });
      }
    } catch (e) {
      dispatch({
        type: GET_PHOTOS_FAIL,
        error: true,
        payload: new Error(e),
      });
    }
  });
}

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({
      type: GET_PHOTOS_REQUEST,
      payload: year,
    });

    if (cached) {
      const photos = makeYearPhotos(photosArr, year);
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos,
      });
    } else {
      getMorePhotos(0, 1000, year, dispatch);
    }
  };
}
