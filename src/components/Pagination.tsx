import React from 'react'

interface IProps {
    onHandleClickNext: any;
    onHandleClickPrev: any;
    currentPage: number;
    total: number;
    limit: number
};

function Pagination(props: IProps) {
    const {
        onHandleClickNext,
        onHandleClickPrev,
        currentPage,
        total,
        limit
    } = props;

    const isNextButtonDisabled = () => {
        const totalPages = Math.ceil(total / limit);

        return currentPage >= totalPages;
    }

    const handleClickNext = () => {
        if (onHandleClickNext) onHandleClickNext()
    };

    const handleClickPrev = () => {
        if (onHandleClickPrev) onHandleClickPrev()
    }

    return (
        <div className='mt-8 flex justify-center'>
            <button
                className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
                disabled={currentPage === 1}
                onClick={handleClickPrev}
            >
                Prev
            </button>

            <button
                className='p-2 bg-red-900 rounded-md text-white mr-4 disabled:opacity-40 disabled:cursor-not-allowed select-none'
                onClick={handleClickNext}
                disabled={isNextButtonDisabled()}
            >Next
            </button>
        </div>
    )
}

export default Pagination