import React, { useEffect, useState } from 'react'
import { Input, Button, Table, InputNumber, notification } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { GetData, SetDataDetailPegawai } from '../Redux/Action';

export default function Home(props) {
    const { label } = props
    const limit = 3
    const dispatch = useDispatch();
    const data = useSelector(state => state.GetData.data); // ambil data dari store reducer
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [val, setVal] = useState({})
    const [flagGet, setFlagGet] = useState(false)
    const [edit, setEdit] = useState(false)
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const columns = [
        {
          title: 'Nama Pegawai',
          dataIndex: 'nama_pegawai',
          key: 'nama_pegawai',
          fixed: 'left',
        },
        {
          title: 'Alamat Pegawai',
          dataIndex: 'alamat_pegawai',
          key: 'alamat_pegawai',
          fixed: 'left',
        },
        {
          title: 'Gaji Pegawai',
          dataIndex: 'gaji_pegawai',
          key: 'gaji_pegawai',
          fixed: 'left',
        },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 300,
          render: (e) => {
            return (
                <div>
                    <Button style={{ marginRight: 10 }} type="ghost" onClick={() => detail(e)}>Detail</Button>
                    <Button style={{ marginRight: 10 }} type="primary" onClick={() => setEditData(e)}>Edit</Button>
                    <Button type="danger" onClick={() => deleteData(e)}>Hapus</Button>
                </div>
            )
          },
        },
      ];

    const detail = (e) => {
        dispatch(SetDataDetailPegawai(e))
        navigate('/detail')
    }

    useEffect(() => {
        // singkronous dan asingkronous
        setLoading(true)
        const param = search ? `&nama_pegawai=${search}` : ''
        dispatch(GetData(param, limit, page))
        console.log('pertama')
        // const fetchApi = async () => {
        //     const param = search ? `&nama_pegawai=${search}` : ''
        //     const response = await axios.get(`http://localhost:4040/controller/get-data-pegawai?limit=10&page=1${param}`)
        //     if (response.data.success === true) {
        //         setData(response.data.data)
        //         setLoading(false)
        //     }
        // }
        // fetchApi()
    }, [flagGet, search, limit, page])

    const postData = async () => {
        const body = val
        const url = 'http://localhost:4040/controller/insert-data-pegawai'
        const response = await axios.post(url, body)
        if (response.data.success === true) {
            notification.success({
                message: response.data.data,
              });
            setFlagGet(!flagGet)
        }
    }

    const setEditData = (item) => {
        setEdit(true)
        setVal(item)
    }

    const editData = async () => {
        const body = val
        const url = `http://localhost:4040/controller/update-data-pegawai/${val.id}`
        const response = await axios.put(url, body)
        if (response.data.success === true) {
            notification.success({
                message: response.data.data,
              });
            setEdit(false)
            setVal({})
            setFlagGet(!flagGet)
        }
    }

    const deleteData = async (item) => {
        const response = await axios.delete(`http://localhost:4040/controller/delete-data-pegawai/${item.id}`)
        if (response.data.success === true) {
            notification.success({
                message: response.data.data,
              });
            setFlagGet(!flagGet)
        }
    }

    const onChangeData = (item) => {
        const temp = {
            ...val, ...item
        }
        setVal(temp)
    }

  return (
    <div style={{ width: '100%' }}>
        <h1>
            {label} 
        </h1>

        <div style={{ width: '30%' }}>
            <div style={{ display: 'flex' }}>
                <div style={{ width: '60%' }}>
                    <label style={{ marginRight: 20 }}>Nama Pegawai</label>
                </div>
                <div>
                    <Input 
                        value={val.nama_pegawai}
                        onChange={(e) => onChangeData({nama_pegawai: e.target.value})} />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <label style={{ marginRight: 20 }}>Alamat Pegawai</label>
                <Input 
                    value={val.alamat_pegawai}
                    onChange={(e) => onChangeData({alamat_pegawai: e.target.value})} />
            </div>
            <div style={{ display: 'flex' }}>
                <label style={{ marginRight: 20 }}>Gaji Pegawai</label>
                <InputNumber 
                    value={val.gaji_pegawai} 
                    onChange={(e) => onChangeData({gaji_pegawai: e})}
                    style={{ width: '100%' }} />
            </div>
            <br />
            <div>
                <Button type="primary" onClick={() => edit ? editData() : postData()}>{edit ? 'Edit Data' : 'Input Data'}</Button>
                {edit ? (
                    <Button 
                        type="danger" 
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            setEdit(false)
                            setVal({})
                    }}>Cancel</Button>
                ) : ''}
            </div>
        </div>
        <br />

        <div style={{ width: '60%', justifyContent: 'center' }}>
            <Input 
                placeholder='Cari Data' 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} />
            <Table 
                columns={columns} 
                dataSource={data.data}
                onChange={(e) => setPage(e.current)}
                pagination={{ current: page, pageSize: limit, total: data.total }} />
        </div>
    </div>
  )
}
