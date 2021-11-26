import { useState, useCallback } from 'react';
import './App.css';
import Loader from 'react-loader-spinner';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import Modal from 'components/Modal';


export default function App  () {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [status, setStatus] = useState('idle');

  const onLoadMore = () => {
    setPage(page => page + 1);
    setStatus('pending');
  };

  const toggleModal = () => {
    setShowModal(showModal => !showModal);
  };

  const setModalImage = largeImageURL => {
    setLargeImageURL(largeImageURL);
  };

  const handleFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setStatus('idle');
  };

  const handleStatus = useCallback(
    status => setStatus(status),
    [],
  );

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        query={query}
        toggleModal={toggleModal}
        setModalImage={setModalImage}
        page={page}
        handleStatus={handleStatus}
        status={status}
      />

      {status === 'pending' && (
        <Loader
          type="ThreeDots"
          color="#3f51b5"
          height={50}
          width={80}
          timeout={3000}
        />
      )}

      {status === 'resolved' && (
        <Button onClick={onLoadMore} />
      )}

      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </div>
  );
};