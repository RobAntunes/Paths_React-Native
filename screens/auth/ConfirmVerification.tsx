import React from 'react';

const ConfirmVerification = ({navigation}: {navigation: any}) => {
  return (
    <div>
      <h1>Confirm Verification</h1>
      <button onClick={() => navigation.navigate('Login')}>Login</button>
    </div>
  );
};

export default ConfirmVerification;
