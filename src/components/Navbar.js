import React from 'react'
import {
    Link
  } from "react-router-dom";
import { Input, Button } from 'antd'

export default function Navbar() {
  return (
    <div 
        style={{ 
            display: 'flex',
            borderBottomStyle: 'solid',
            borderColor: 'gray',
            padding: 5
        }}>
        <div style={{ marginLeft: 20 }}>
            <h2 style={{ color: 'green' }}>Tokopaedi</h2>
        </div>
        <div style={{ marginLeft: 20, display: 'flex', width: '50%' }}>
            <Input 
                placeholder='Cari'
                style={{ width: '100%' }} />
            <Button type="primary">Cari</Button>
        </div>
        <div style={{ marginRight: 20, marginLeft: 'auto' }}>
            <Link to="/">Home</Link>
        </div>
        <div style={{ marginRight: 30 }}>
            <Link to="/about">About</Link>
        </div>
    </div>
  )
}
