import React, { useState } from 'react';
import Dropdown from '../announcement/components/Dropdown';
import SearchInput from '../announcement/components/SearchInput';
import TableComponent from '../announcement/components/TableComponenet';


const mockData = [
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
    { id: 312, title: '공지사항 1', content: '공지사항 내용 1', date: '23/12/10' },
];

const AnnouncementPage = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = mockData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">공지사항</h1>
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                <Dropdown />
                <SearchInput value={searchTerm} onChange={setSearchTerm} />
            </div>
            <TableComponent data={filteredData} />
        </div>
    );
};

export default AnnouncementPage;
