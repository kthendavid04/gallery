const signupHandler = async (e) => {
    e.preventDefault();

    const first_name = document.querySelector('#firstname').value.trim();
    const last_name = document.querySelector('#lastname').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value.trim();
    const address = document.querySelector('#address').value.trim();
    const bank_info = document.querySelector('#bankinfo').value.trim();

    if (first_name && last_name && email && password && address && bank_info) {
        const resp = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, address, bank_info }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (resp.ok) {
            alert("Account creation successful!")
            document.location.replace('/profile');
        } else {
            alert(resp.statusText);
        }
    }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupHandler);