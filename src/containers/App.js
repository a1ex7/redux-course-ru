import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import User from '../components/User';
import Page from '../components/Page';

import * as pageActions from '../actions/PageActions';
import * as userActions from '../actions/UserActions';

class App extends Component {
  render() {
    const { user, page } = this.props;
    const { getPhotos } = this.props.pageActions;
    const { handleLogin, getLoginStatus } = this.props.userActions;
    return (
      <div className='row'>
        <Page
          year={page.year}
          photos={page.photos}
          featching={page.featching}
          getPhotos={getPhotos}
          error={page.error}
        />
        <User
          name={user.name}
          handleLogin={handleLogin}
          getLoginStatus={getLoginStatus}
          error={user.error}
        />
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.shape.isRequired,
  page: PropTypes.shape.isRequired,
  pageActions: PropTypes.shape.isRequired,
  userActions: PropTypes.shape.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    page: state.page,
    featching: state.featching,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
