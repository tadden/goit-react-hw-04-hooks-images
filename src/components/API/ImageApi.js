
const KEY = '23635277-6f81df1acb0b4fe12e608e34f';


 function fetchImages(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`There are no images ${name}`),
    );
  });
}

export default fetchImages;