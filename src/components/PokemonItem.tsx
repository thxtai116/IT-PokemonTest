import React from 'react'
import Image from 'next/image';

import { getDetail } from '@/apis';
import { useQuery } from '@tanstack/react-query';

import LoadingItem from './LoadingItem';

function PokemonItem(props: any) {
    const { poke } = props;

    const { isLoading, data } = useQuery({
        queryKey: ['url', poke.url],
        queryFn: () => getDetail(poke.url),
        retry: 0,
    });

    if (isLoading) {
        return <LoadingItem />
    }

    return (
        <div>
            <div className='h-24 w-24 mx-auto'>
                <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.data.id}.png`}
                    alt="Picture of the author"
                    width={100}
                    height={100}
                    title="Picture"
                    loading='lazy'
                />
            </div>

            <div className='text-center'>
                {poke.name}
            </div>
        </div>
    )
}

export default PokemonItem