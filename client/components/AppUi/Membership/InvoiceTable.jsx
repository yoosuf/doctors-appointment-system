import React from 'react';

const InvoiceTable = ({ lineItems }) => {
  return (
    <div className='my-6 rounded shadow-md'>
      <table className='w-full table-auto min-w-max'>
        <thead>
          <tr className='text-sm leading-normal text-gray-400 uppercase'>
            <th className='px-6 py-3 text-left'>Service</th>
            <th className='px-6 py-3 text-left'>Rate</th>
            <th className='px-6 py-3 text-center'>Amount</th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-100'>
          {lineItems.map(item => (
            <tr className='border-b border-gray-800' key={item.id}>
              <td className='px-6 py-3 text-left whitespace-nowrap'>
                <div className='flex items-center'>
                  <span className='font-medium'>{item.name}</span>
                </div>
              </td>
              <td className='px-6 py-3 text-left'>
                <div className='flex items-center'>
                  <span>${item.price}</span>
                </div>
              </td>
              <td className='px-6 py-3 text-center'>
                <span>${item.amount}</span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className='font-bold text-gray-100 border-t border-gray-700'>
            <td className='px-6 py-3 text-left' colSpan={2}>
              Sub Total
            </td>
            <td className='px-6 py-3 text-center'>
              ${lineItems.reduce((acc, item) => acc + item.price, 0)}
            </td>
          </tr>
          <tr className='font-bold text-gray-100 border-t border-b border-gray-700'>
            <td className='px-6 py-3 text-left' colSpan={2}>
              Total
            </td>
            <td className='px-6 py-3 text-center'>
              ${lineItems.reduce((acc, item) => acc + item.amount, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceTable;
