"use client"

import { BarLoader } from "react-spinners"

function Componentloader({text,color, loading, size}) {
  return (
    <span>{text}
    <BarLoader
    color={color}
    loading={loading}
    size={size || 10}
    data-testid = "loader"
    />
    
    </span>
  )
}

export default Componentloader