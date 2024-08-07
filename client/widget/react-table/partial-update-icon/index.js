import React, { useState } from 'react';

const IconAction = (props) => {
  const [isActive, setIsActive] = useState(props.type !== 'deliverable' ? props.original.isActive : props.original.isDeliverable);

  const handleActiveChange = async () => {
    await props.onChangeActive(props.original).then(() => {
        setIsActive(!isActive);
    });
  };
  
  return <label className='switch'>
    <input
      type='checkbox'
      checked={isActive}
      onChange={() =>  handleActiveChange()}
    />
    <span className='slider round'></span>
  </label>
};
export default IconAction;
