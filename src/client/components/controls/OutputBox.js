import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';

class OutputBox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    // if (this.props.show) {
    const { show, message } = this.props;

    // Regular expression to extract the counter value
    const regex = /Test Case Result: (\d+) \/ 10/;
    const match = message.match(regex);
    const counter = match ? match[1] : 'N/A'; // Default to 'N/A' if counter not found
    let messageText;
    if (counter !== 'N/A') {
        if (counter == 9) {
          messageText = ` Test Case Pass: ${counter} / 9 \n you pass all the test cases! \n you got 3 marks!`;
        } else {
          messageText = `Test Case Pass: ${counter} / 9 \n  you fail the test cases, \n you do not have any marks`;
        }
    }

    console.log(message);
    console.log('counter:', typeof (counter));
    console.log('counter:', counter);

    localStorage.setItem('counter', counter);
    if (show) {
      return (
          <FormControl
              name="code"
              type="textarea"
              componentClass="textarea"
              rows="8"
              readOnly
              // value={this.props.message}
              value={messageText}
              style={{ fontSize: '20px' }}
          />
      );
    }

    return (
        <FormControl
            name="code"
            type="textarea"
            componentClass="textarea"
            rows="8"
            readOnly
            value=""
        />
    );
  }
}

OutputBox.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
};

export default OutputBox;