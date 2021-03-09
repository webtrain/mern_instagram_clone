import React from 'react';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <div
      className={`toast position-fixed show p-1 text-light ${bgColor} fs-5`}
      style={{ top: '5px', right: '5px', minWidth: '200px', zIndex: 50 }}
    >
      <div className={`toast-header text-light  ${bgColor} d-flex justify-content-between`}>
        <strong className="mr-auto">{msg.title}</strong>
        <button
          className="ml-2 close text-light fs-3"
          data-dismiss="toast"
          style={{ border: 'none', backgroundColor: 'transparent', outline: 'none' }}
          onClick={handleShow}
        >
          &times;
        </button>
      </div>

      <div className="toast-body">{msg.body}</div>
    </div>
  );
};

export default Toast;
