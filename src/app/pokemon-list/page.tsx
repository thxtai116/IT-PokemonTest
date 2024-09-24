
'use client';

import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// ! Apis
import { getPokemon, getType } from '@/apis'

// ! Components
import ListType from '@/components/ListType'
import Pagination from '@/components/Pagination'
import Pokemons from '@/components/Pokemons'

import { findCommonObjects } from '@/lib/helpers';

const LIMIT = 48;
const MAX_RESULT = 1200

function PokemonList() {
    const [page, setPage] = useState(1);
    const [type, setType] = useState<Array<string>>([]);
    const [total, setTotal] = useState(0)
    const [pokemonResult, setPokemonResult] = useState([]);
    const [pokemonByTypeResult, setPokemonByTypeResult] = useState<Record<string, Array<unknown>>>({});

    const { isLoading, data }: any = useQuery({
        queryKey: ['type'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000)
            return getType(controller.signal)
        },
        retry: 0
    });

    const { isLoading: isLoadingList, data: pokemonList }: any = useQuery({
        queryKey: ['pokemon'],
        queryFn: () => {
            const controller = new AbortController();

            setTimeout(() => {
                controller.abort()
            }, 5000);

            return getPokemon(type, MAX_RESULT, controller.signal)
        },
        retry: 0,
    });

    // * Gọi tất cả APIs liên quan đến Type
    useEffect(() => {
        if (!isLoading && data?.results.length) {
            const types = [...data.results];

            const newPokemonByTypeResult: any = {};
            const urls = types.map(type => type.url);
            const promises = urls.map((url) => {
                return axios.get(url);
            });

            Promise.all(promises).then(function (values) {
                values.forEach((res: any) => {
                    const data = res.data
                    newPokemonByTypeResult[data.id] = data.pokemon
                })
            });

            setPokemonByTypeResult(newPokemonByTypeResult)
        }
    }, [isLoading, data])


    useEffect(() => {
        if (!isLoadingList && pokemonList?.results?.length) {
            let result: any = [...pokemonList.results];
            let newTotal = MAX_RESULT;

            setTotal(MAX_RESULT);

            if (type.length) {
                const getIdByUrl = type.map(url => parseInt(url.split('/').slice(-2, -1)[0]));

                const resultByType = getIdByUrl.reduce((acc: any, id) => {
                    if (pokemonByTypeResult[id]) {
                        acc[id] = pokemonByTypeResult[id];
                    }
                    return acc;
                }, {});

                // ! Trường hợp có type nhìu hơn 1 sử dụng toán AND
                result = type.length > 1
                    ? findCommonObjects(resultByType).map((y: any) => y.pokemon)
                    : Object.values(resultByType).flat().map((y: any) => y.pokemon);


                newTotal = result.length
            }

            // ! Xử lý logic Phân trang
            result = result.slice((page - 1) * LIMIT, page * LIMIT);

            setPokemonResult(result);
            setTotal(newTotal);
        } else {
            setPokemonResult([]);
            setTotal(0);
        }


    }, [isLoadingList, pokemonList, type, page, pokemonByTypeResult])

    const handleClickNext = () => setPage(prevPage => prevPage + 1);

    const handleClickPrev = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

    const handleTypeChanged = (payload: string) => {
        const newType: Array<string> = [...type];
        const existTabIndex = newType.findIndex((url) => url === payload)

        if (existTabIndex !== -1) {
            newType.splice(existTabIndex, 1)
        }
        else {
            newType.push(payload)
        }

        setType(newType);

        // ! Reset lại trang 
        setPage(1)
    }

    return (
        <div className='mx-auto max-w-screen-xl'>
            <ListType
                active={type}
                isLoading={isLoading}
                options={data?.results}
                onClickType={handleTypeChanged}
            />

            <Pokemons
                isLoading={isLoadingList}
                list={pokemonResult || []}
                total={total}
                limit={LIMIT}
            />

            <Pagination
                currentPage={page}
                onHandleClickNext={handleClickNext}
                onHandleClickPrev={handleClickPrev}
                total={total}
                limit={LIMIT}
            />
        </div>
    )
}

export default PokemonList