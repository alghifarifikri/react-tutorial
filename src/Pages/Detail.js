import React from 'react'
import { useSelector } from 'react-redux';

export default function Detail() {
    const detail = useSelector(state => state.DetailData.data);
    console.log({detail})
  return (
    <div>
        <div>
            Nama Pegawai : {detail.nama_pegawai}
        </div>
        <div>
            Alamat Pegawai : {detail.Alamat}
        </div>
        <div>
            Gaji Pegawai : {detail.gaji_pegawai}
        </div>
        <div>
            Region : {detail.region}
        </div>
    </div>
  )
}
