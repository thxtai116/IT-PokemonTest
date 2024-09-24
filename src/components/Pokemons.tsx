import React from 'react'

import PokemonItem from './PokemonItem';
import LoadingItem from './LoadingItem';

interface IProps {
    total: number | string;
    isLoading: boolean;
    list: Array<any>;
    limit: number
};

function Pokemons(props: IProps) {
    const { total, isLoading, list, limit } = props;

    if (isLoading) {
        return <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
            {Array.from(Array(limit), (_, index) => index + 1).map((_, key) => {
                return <LoadingItem key={key} />
            })}
        </div>
    };

    return (
        <>
            {total ?
                <>
                    <div className='my-12 mx-4 font-bold'>
                        {total} results found.
                    </div>

                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4'>
                        {list?.map((poke, idx) => {
                            return <PokemonItem poke={poke} key={idx} />
                        })}
                    </div>
                </> : <div className='text-center text-3xl mx-auto my-24 font-bold'>
                    No results found.
                </div>}
        </>
    )
}

export default Pokemons