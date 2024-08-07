import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function AppModel({ open, onClose, title, content, onSubmit, submitLabel }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(inputValue);
    }
    // You can choose to close the modal here if needed.
    // onClose();
  };

  const modalStyles = {
    zIndex: 9999, // Set a high z-index to force it on top of other UI elements
  };

  // Define a dummy onClose function that does nothing
  const dummyOnClose = () => {};

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-y-auto"
        onClose={dummyOnClose} // Use the dummy onClose function
        style={modalStyles}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white p-6 mx-4 md:mx-0 max-w-md w-full text-center rounded-lg shadow-xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                {title}
              </Dialog.Title>
              <form onSubmit={handleSubmit} className="mt-6">
                {content}
                <div className="mb-4">
                  <label
                    htmlFor="input"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Input Field
                  </label>
                  <input
                    type="text"
                    id="input"
                    name="input"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Enter something"
                    required
                  />
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                  >
                    {submitLabel}
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default AppModel;
