import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CreditCardIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';

const PaymentMethodSelector = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  return (
    <div className='col-span-9 pb-100'>
        <RadioGroup value={selectedMethod} onChange={setSelectedMethod} className='relative grid items-center grid-cols-2 gap-3 form-group'>
          <RadioGroup.Option value="card">
            {({ checked }) => (
              <a
                className={`flex-cen gap-2 text-gray-400 border border-gray-700 p-2.5 rounded-lg transition hover:border-yellowBg sm:text-base text-sm ${
                  checked ? 'border-yellowBg' : ''
                }`}>
                <CreditCardIcon className="w-5 h-5" />
                Pay with card
              </a>
            )}
          </RadioGroup.Option>
          <RadioGroup.Option value="cash">
            {({ checked }) => (
              <a
                className={`flex-cen gap-2 text-gray-400 border border-gray-700 p-2.5 rounded-lg transition hover:border-yellowBg sm:text-base text-sm ${
                  checked ? 'border-yellowBg' : ''
                }`}>
                <CurrencyDollarIcon className="w-5 h-5" />
                Pay with cash
              </a>
            )}
          </RadioGroup.Option>
        </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
