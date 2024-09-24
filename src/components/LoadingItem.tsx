import React from 'react'

function LoadingItem() {
    return (
        <div>
            <div className='h-24 w-24 mx-auto'>
                <div className="bg-gray-100 rounded-full dark:bg-gray-300 w-full" style={{
                    width: 100,
                    height: 100
                }}>
                </div>
            </div>
            <div className="h-7 bg-gray-100 dark:bg-gray-3s00 w-full mt-4"></div>
        </div>
    )
}

export default LoadingItem