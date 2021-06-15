const unlistPieceHandler = async (event) => {

  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    const selling = false;

    if (id) {
        const response = await fetch(`/api/paintings/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ selling }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert("Your painting is now unlisted")
            document.location.replace('/profile/unlisted');
        } else {
            alert(resp.statusText);
        }
    }
  };
}

document
  .querySelector('.unlist-btn')
  .addEventListener('click', unlistPieceHandler);