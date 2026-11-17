import React from 'react'
import { useParams } from 'react-router-dom'

const ViewProduct = () => {
  const {id} = useParams();
  
  return (
    <div>ViewProduct</div>
  )
}

export default ViewProduct