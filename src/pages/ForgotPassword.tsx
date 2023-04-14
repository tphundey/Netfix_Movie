import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:3000/user', { email })
      .then(response => {
        setMessage('Mật khẩu đã được gửi đến email của bạn.');
      })
      .catch(error => {
        setMessage('Không thể lấy lại mật khẩu. Vui lòng kiểm tra lại email của bạn.');
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        <button type="submit">Lấy lại mật khẩu</button>
      </form>
      <div id="message">{message}</div>
    </div>
  );
}

export default ForgotPassword;