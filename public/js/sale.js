const saleHandler = async (event) => {
    event.preventDefault();

    const buyerEl = document.getElementById('buyer');
    const buyer_id = buyerEl.getAttribute('data-desc');

    const paintingProcIdEl = document.getElementById('paintingProcId');
    const paintingProcId = paintingProcIdEl.getAttribute('data-desc');

    if (buyer_id) {
        const response = await fetch(`/api/paintingprocs/${paintingProcId}`, {
            method: 'PUT',
            body: JSON.stringify({ buyer_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            alert('Congrats on the purchase of your new art piece!');
            document.location.replace('/profile/purchased');
        } else {
            alert('Failed to complete purchase');
        }
    }
};

document.querySelector('#buy').addEventListener('click', saleHandler);