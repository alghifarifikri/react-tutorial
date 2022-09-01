export default function SetDataDetailPegawai(data) {
    return {
      type: 'SET_DATA_DETAIL_PEGAWAI',
      payload: data,
    };
  }
  
  export function SetLoading(data) {
    return {
      type: 'SET_LOADING_DATA_DETAIL_PEGAWAI',
      payload: data,
    };
  }