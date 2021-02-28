import React from 'react';
import { Modal, Button } from 'react-bootstrap';
export default function Error({ show, handleClose, error }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <div
        style={{
          padding: '5px',
          backgroundColor: '#03A9F4',
          color: 'white',
          fontSize: '18px',
          borderTopLeftRadius: '3px',
          borderTopRightRadius: '3px',
        }}
      >
        Thông báo
      </div>
      <div
        style={{
          display: 'flex',
          margin: '20px auto',
          fontSize: '18px',
          fontWeight: '400',
        }}
      >
        {error}
      </div>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
