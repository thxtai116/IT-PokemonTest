import React from 'react'

function Loading() {
    return (
        <div role="status" className="animate-pulse pt-6 pb-10">
            <div className="h-7 bg-gray-100 rounded-full dark:bg-gray-300 w-full"></div>
            <div className="h-7 bg-gray-100 rounded-full dark:bg-gray-3s00 w-full mt-4"></div>
        </div>
    )
}

export default Loading