import axios from 'axios';
import Cookies from 'js-cookie';

const token = Cookies.get('token')

export default function GetData(param, limit, page) {
  return async dispatch => {
    dispatch(SetLoading(true));
    try {
      const url = `http://localhost:4040/controller/get-data-pegawai?limit=${limit}&page=${page}${param}`
      const response = await axios.get(url, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
        if (response.data.success === true) {
          dispatch(SetDataPegawai(response.data))
          dispatch(SetLoading(false))
        }
    } catch (e) {
      console.log({errornya: e});
    } finally {
      dispatch(SetLoading(false));
    }
  };
}

export function SetDataPegawai(data) {
  return {
    type: 'SET_DATA_PEGAWAI',
    payload: data,
  };
}

export function SetLoading(data) {
  return {
    type: 'SET_LOADING_DATA_PEGAWAI',
    payload: data,
  };
}