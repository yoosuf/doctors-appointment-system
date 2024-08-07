import React from 'react';
import {
  CheckCircleIcon,
  TrashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'

function CreditCard({ card, openModal }) {
  return (
    <div key={card._id} className='relative p-5 overflow-hidden rounded-lg atm-card atm1 noselect'>
      <CardHeader card={card} />
      <CardNumber card={card} />
      <CardExpiration card={card} />
      <CardFooter card={card} openModal={openModal} />
    </div>
  );
}

function CardHeader({ card }) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center'>
        {card.isPrimary && (
          <>
            <CheckCircleIcon className='w-5 h-5 text-white' />
            <h6 className='ml-2 text-sm'>ACTIVE (DEFAULT)</h6>
          </>
        )}
      </div>
      {/* <a onClick={() => openModal(card)} className='flex items-center justify-center rounded-lg cursor-pointer atm-setting h-9 w-9'> */}
        <TrashIcon className='w-5 h-5 text-white' />
      {/* </a> */}
    </div>
  );
}

function CardNumber({ card }) {
  return (
    <h3 className='my-2 text-xl font-semibold'>
      {card.first6.substring(0, 4) + ' •••• •••• ' + card.last4}
    </h3>
  );
}

function CardExpiration({ card }) {
  return (
    <div className='flex items-center justify-center'>
      <div style={{ fontSize: '10px', lineHeight: '1' }}>
        <p>Valid</p>
        <p>Thru</p>
      </div>
      <div className='ml-1 font-bold'>
        <p className='text-lg'>
          {card.expMonth}/{card.expYear.toString().substring(2, 4)}
        </p>
      </div>
    </div>
  );
}

function CardFooter({ card, openModal }) {
  return (
    <div className='flex items-center justify-between'>
      <div className='font-bold'>
        {card?.cardHolderFirstName?.toUpperCase() || ''}
      </div>
      <div className='text-3xl italic font-bold visa'>
        {card.cardType.toUpperCase()}
      </div>
    </div>
  );
}

export default CreditCard;
