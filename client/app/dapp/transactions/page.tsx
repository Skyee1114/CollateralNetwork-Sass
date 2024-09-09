'use client'

import { useState } from "react";
import { ArrangeHorizontal } from "iconsax-react";

export default function Transactions() {

  const data = [
    { id: '2349', date: '20-Jun-24', type: 'Vested Claim', amount: '54.12', to: '0x4833C5...9B338', from: '0x5220C3...902A2', status: 'Cleared' },
    { id: '6089', date: '20-Jun-24', type: 'Asset Transfer', amount: '24.10', to: '0x234B23...734B3', from: '0x4833C5...9B338', status: 'Cleared' },
    { id: '6567', date: '20-Jun-24', type: 'Asset Payment', amount: '43.07', to: '0x4833C5...9B338', from: '0x5290C2...26C52', status: 'Pending' },
    { id: '4567', date: '20-Jun-24', type: 'Asset Transfer', amount: '36.00', to: '0x4833C5...9B338', from: '0x5220C3...902A2', status: 'Cleared' },
    { id: '4565', date: '19-Jun-24', type: 'Vested Claim', amount: '76.00', to: '0x4833C5...9B338', from: '0x234B23...734B3', status: 'Pending' },
    { id: '4337', date: '19-Jun-24', type: 'Vested Claim', amount: '36.08', to: '0x4833C5...9B338', from: '0x234B23...734B3', status: 'Pending' },
    { id: '6169', date: '19-Jun-24', type: 'Asset Payment', amount: '21.30', to: '0x4833C5...9B338', from: '0x234B23...734B3', status: 'Pending' },
    { id: '2562', date: '19-Jun-24', type: 'Vested Claim', amount: '76.00', to: '0x4833C5...9B338', from: '0x234B23...734B3', status: 'Pending' },
  ];

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(0);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < data.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const selectedRows = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="w-full max-w-[1280px] mx-auto">
      <div className="flex justify-center items-center gap-2">
        <ArrangeHorizontal size="36" color="#ffffff"/>
        <p className="text-4xl text-white">Transactions</p>
      </div>
      <p className="text-center text-white pt-8">The TRANSACTIONS section is your comprehensive log of all activities on your account. Here, you can view details of every transaction you’ve made, providing a transparent record of your financial activities. From date to type, status to associated assets or tokens, this feature keeps you informed and in control.</p>
      <div className="pt-12">
        <div className="bg-[#14172E] rounded-lg py-4">
          <div className="text-white">
            <div className="mb-4 mx-4">
              <p className="font-medium text-xl text-white">Transactions</p>
            </div>
            <table className="w-full table-auto text-white">
              <thead className="text-sm">
                <tr>
                  <th className="font-normal text-left p-4">Transaction Id</th>
                  <th className="font-normal text-left p-4">Date</th>
                  <th className="font-normal text-left p-4">Type</th>
                  <th className="font-normal text-left p-4">Amount (ETH)</th>
                  <th className="font-normal text-left p-4">To</th>
                  <th className="font-normal text-left p-4">From</th>
                  <th className="font-normal text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {selectedRows.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 1 ? '' : 'bg-[#060A1E]'}>
                    <td className="p-4">{row.id}</td>
                    <td className="p-4">{row.date}</td>
                    <td className="p-4">{row.type}</td>
                    <td className="p-4">{row.amount}</td>
                    <td className="p-4">{row.to}</td>
                    <td className="p-4">{row.from}</td>
                    <td className="p-4">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-end gap-8 mt-4 mx-4">
              <div className="flex items-center">
                <label htmlFor="rows-per-page" className="mr-2 text-sm">Rows per page:</label>
                <select id="rows-per-page" value={rowsPerPage} onChange={handleRowsPerPageChange} className="text-black">
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>5
                </select>
              </div>
              <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 0} className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50">
                  &larr; Previous
                </button>
              </div>
              <div>
                <button onClick={handleNextPage} disabled={(currentPage + 1) * rowsPerPage >= data.length} className="px-4 py-2 bg-gray-600 rounded disabled:opacity-50">
                  Next &rarr;
                </button>
              </div>       
            </div>
          </div>
        </div>        
      </div>
    </div>
  );
}
