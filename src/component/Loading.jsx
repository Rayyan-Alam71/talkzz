import React from 'react'

const Loading = ({loading}) => {
  return (
    <div>
      {loading && <Balls/>}
    </div>
  )
}
const Balls = ()=>{
    return(
        <>
            <span className="loading loading-ball loading-xs"></span>
            <span className="loading loading-ball loading-sm"></span>
            <span className="loading loading-ball loading-md"></span>
            <span className="loading loading-ball loading-lg"></span>
        </>
    )
}
export default Loading
