import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import BreedList from '../breedList/BreedList';
import PaginationList from '../paginationList/PaginationList';

export default function BreedContainer({ breeds }) {
    const [page, setPage] = useState(0);
    const [breedPagination, setBreedPagination] = useState([]);

    useEffect(() => {
        setPage(0);
    }, [])

    useEffect(() => {
        let breedPaginationArray = [];
        for (let i = 0; i < breeds.length; i += 8) {
            breedPaginationArray.push(breeds.slice(i, i + 8));
        }
        setBreedPagination(breedPaginationArray[page])
    }, [breeds, page])

    return (
        <div>
            <BreedList breeds={breedPagination} page={page} />
            <PaginationList quantity={Math.ceil(breeds.length / 8)} setPage={setPage} />
        </div>
    )
}
