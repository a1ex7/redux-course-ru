import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Page extends Component {
  constructor(props) {
    super(props);
    this.onYearBtnClick = this.onYearBtnClick.bind(this);
  }
  onYearBtnClick(e) {
    this.props.getPhotos(+e.target.textContent);
  }

  render() {
    const { year, photos, featching, error } = this.props;
    const years = [2017, 2016, 2015, 2014];
    return (
      <div className='ib page'>
        <p>
          {years.map(item => (
            <button className='btn' key={item} onClick={this.onYearBtnClick}>
              {item}
            </button>
          ))}
        </p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {error ? <p className='error'> Во время загрузки фото произошла ошибка</p> : ''}
        {featching ? (
          <p>Загрузка...</p>
        ) : (
          photos.map(entry => (
            <div key={entry.pid} className='photo'>
              <div className='photo__img' style={{ backgroundImage: `url( ${entry.src} )`, border: '1px solid black' }} />
              <p>{entry.likes.count} ❤</p>
            </div>
          ))
        )}
      </div>
    );
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPhotos: PropTypes.func.isRequired,
  featching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
};

export default Page;
