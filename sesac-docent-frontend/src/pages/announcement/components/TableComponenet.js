import React, { useState } from 'react';
import Pagination from './Pagination';

const mockData = [
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
];

const TableComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = mockData.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="py-3 px-6">ID</th>
                        <th scope="col" className="py-3 px-6">Title</th>
                        <th scope="col" className="py-3 px-6">Content</th>
                        <th scope="col" className="py-3 px-6">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(item => (
                        <tr key={item.id} className="bg-white border-b">
                            <td className="py-4 px-6">{item.id}</td>
                            <td className="py-4 px-6">{item.title}</td>
                            <td className="py-4 px-6">{item.content}</td>
                            <td className="py-4 px-6">{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination 
                itemsPerPage={itemsPerPage} 
                totalItems={mockData.length} 
                paginate={(pageNumber) => setCurrentPage(pageNumber)} 
            />
        </div>
    );
};

export default TableComponent;
