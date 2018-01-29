import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    getLoginStatus: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
  };

  componentWillMount() {
    this.props.getLoginStatus();
  }

  render() {
    const { name, error } = this.props;

    return (
      <div className='ib user'>
        {name && <h3>Привет, {name}</h3>}
        <button className='btn' onClick={this.props.handleLogin}>
          Войти
        </button>
        {error && (
          <p className='error'>
            {error}. <br /> Попробуйте еще раз.
          </p>
        )}
      </div>
    );
  }
}

export default User;
