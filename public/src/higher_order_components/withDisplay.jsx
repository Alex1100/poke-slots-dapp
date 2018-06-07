import React from 'react';

export const withDisplay = (WrappedComponent, props) => (
  <WrappedComponent {...props} />
);
