const saleHandler = async (event) => {
    event.preventDefault();

    const buyerEl = document.getElementById('buyer');
    const buyer_id = buyerEl.getAttribute('data-desc');

    const paintingProcIdEl = document.getElementById('paintingProcId');
    const paintingProcId = paintingProcIdEl.getAttribute('data-desc');
    const paintingId = paintingProcIdEl.getAttribute("data-painting");

    const end_date = new Date().toISOString();

    console.log(buyerEl);

    if (buyer_id) {
        const response = await fetch(`/api/paintingprocs/${paintingProcId}`, {
            method: 'PUT',
            body: JSON.stringify({ buyer_id, end_date }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) { 
            const updSelling = await fetch(`/api/paintings/${paintingId}`, {
                method: 'PUT',
                body: JSON.stringify({ selling: false, current_owner: buyer_id }),
                headers: { 'Content-Type': 'application/json' },
            });            

            if(updSelling.ok) {
                alert('Congrats on the purchase of your new art piece!');
                document.location.replace('/profile/purchased');
            }
        } else {
            alert('Failed to complete purchase');
        }
    }
};

document.querySelector('#buy').addEventListener('click', saleHandler);