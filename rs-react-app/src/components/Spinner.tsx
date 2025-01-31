import React from 'react';

export class Spinner extends React.PureComponent {
  render(): React.ReactNode {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }
}
