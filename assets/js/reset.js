document.getElementById('reset').addEventListener('submit', e => {

    e.preventDefault();

    const reset = document.getElementById('reset');
    const change = document.getElementById('change');
    const email = document.getElementById('email').value;

    if (email === 'rexben.rb@gmail.com') {
        reset.style.display = 'none';
        change.style.display = 'block';
    } else {
        document.getElementById('error').innerHTML = 'No account is associated with this email. Pls try again';

    }
});




document.getElementById('change').addEventListener('submit', e => {

    e.preventDefault();

    let pass = document.getElementById('password').value;
    let c_pass = document.getElementById('c_password').value;

    if (pass === c_pass) {
        window.location.href = './signin.html';
    } else {
        document.getElementById('error').innerHTML = 'Password does not match';
    }
});
