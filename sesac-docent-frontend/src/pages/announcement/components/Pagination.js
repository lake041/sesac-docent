import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="mt-4">
            <ul className="inline-flex items-center -space-x-px">
                {pageNumbers.map(number => (
                    <li key={number}>
                        <a onClick={() => paginate(number)} href="!#" className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
