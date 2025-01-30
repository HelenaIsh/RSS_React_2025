import React from 'react';

export class Spinner extends React.PureComponent {
  constructor(props: {}) {
    super(props);
  }
  render(): React.ReactNode {
    return (
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    );
  }
}
