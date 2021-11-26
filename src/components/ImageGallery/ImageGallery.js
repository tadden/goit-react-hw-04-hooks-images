import  { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { toast } from 'react-toastify';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import fetchImages from '../API/ImageApi';

export default function ImageGallery({
  query,
  page,
  toggleModal,
  setModalImage,
  handleStatus,
  status,
}) {
  
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    if (!query) {
      return;
    }
    handleStatus('pending');
    fetchImages(query, page)
      .then(result => {
        if (page === 1) {
          setPictures(result.hits);
        } else {
          setPictures(prevPictures => [
            ...prevPictures,
            ...result.hits,
          ]);
        }
        handleStatus('resolved');
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, [query, page, handleStatus]);

  const handleImageClick = e => {
    const currentPicture = pictures.find(
      picture => picture.id === Number(e.currentTarget.id),
    );
    if (currentPicture) {
      toggleModal();
      setModalImage(currentPicture.largeImageURL);
    }
  };

  return (
    status !== 'idle' && (
      <ul className={s.gallery}>
        <ImageGalleryItem
          pictures={pictures}
          onClick={handleImageClick}
        />
      </ul>
    )
  );
}

ImageGallery.propTypes = {
  page: PropTypes.number.isRequired,
  query: PropTypes.string.isRequired,
  setModalImage: PropTypes.func.isRequired,
  handleStatus: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};