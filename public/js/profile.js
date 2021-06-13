const newPieceFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const details = document.querySelector('#details').value.trim();
  const price = document.querySelector('#price').value.trim();
  const image = document.querySelector('#image').files[0];

  let fd = new FormData();
  fd.append('title', title);
  fd.append('details', details);
  fd.append('price', price);
  fd.append('image_data', image, `${image.name}`);
  
  if (title && details && image && price) {
    const response = await fetch(`/api/paintings`, {
      method: 'POST',
      body: fd,
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

// const delButtonHandler = async (event) => {
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/projects/${id}`, {
//       method: 'DELETE',
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to delete project');
//     }
//   }
// };

document
  .querySelector('.new-piece-form')
  .addEventListener('submit', newPieceFormHandler);

// document
//   .querySelector('.project-list')
//   .addEventListener('click', delButtonHandler);
