'use client';

import React from 'react'
import Loading from './Loading';

type Type = {
    name: string,
    url: string,
};

interface Iprops {
    options: Array<Type>;
    isLoading: boolean;
    onClickType: any;
    active: Array<string>
}

function ListType(props: Iprops) {
    const { active, options, isLoading, onClickType } = props;

    if (isLoading) {
        return <Loading />
    }

    const handleChangedType = (type: string) => {
        if (onClickType) {
            onClickType(type)
        }
    }

    return (
        <div className='flex items-center mx-4 my-4'>
            <p className='mr-2 my-4 font-bold self-start'>Types:</p>

            <div>
                {options.map((type: Type, index) => {
                    return <button
                        key={index}
                        type="button"
                        className={`px-2 py-2 mx-2 my-2 border-red-900 border-2 rounded-md font-bold ${active.includes(type.url) ? 'text-white bg-red-900' : "text-red-900"} `}
                        onClick={() => {
                            handleChangedType(type.url)
                        }}
                    >
                        {type.name}
                    </button>
                })}
            </div>
        </div>
    )
}

export default ListType