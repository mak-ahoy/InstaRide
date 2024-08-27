import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './Toast.css'; // Import CSS for transitions

type ToastProps = {
  data: any;
  visible: boolean;
  onClose: () => void;
};

const Toast: React.FC<ToastProps> = ({ data, visible, onClose }) => {
  return (
    <CSSTransition
      in={visible}
      timeout={300}
      classNames="toast"
      unmountOnExit
      onExited={onClose}
    >
      <div className="toast-card">
        <div className="toast-content">
          {/* Render your card content here */}
          <h4>{data.user}</h4>
          <p>{data.from} to {data.to}</p>
          <p>{data.amount}</p>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Toast;
