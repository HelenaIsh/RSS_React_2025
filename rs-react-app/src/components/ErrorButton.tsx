import React from 'react';

export class ErrorButton extends React.PureComponent<
  {},
  { hasError: boolean }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  render(): React.ReactNode {
    if (this.state.hasError) {
      throw new Error('test error');
    }
    return (
      <footer>
        <button
          onClick={() => {
            this.setState({ hasError: true });
          }}
        >
          Throw an error
        </button>
      </footer>
    );
  }
}
