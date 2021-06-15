const listPieceHandler = async (event) => {

    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
      const selling = true;
  
      if (id) {
          const response = await fetch(`/api/paintings/${id}`, {
              method: 'PUT',
              body: JSON.stringify({ selling }),
              headers: { 'Content-Type': 'application/json' },
          });
  
          if (response.ok) {
              alert("Your painting is listed for sale!")
              document.location.replace('/profile/listed');
          } else {
              alert(resp.statusText);
          }
      }
    };
  }
  
  document
    .querySelector('.list-btn')
    .addEventListener('click', listPieceHandler);