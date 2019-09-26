$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'https://treasurehunt-sit-209.now.sh/api';

   
$('#register').on('click', function () {
    const user = $('#user').val();
    const password = $('#password').val();
    const confirm = $('#confirm').val();
    if (password !== confirm) {
        return res.send('Password do not match');
    } else {
        $.post(`${API_URL}/registration`, {user, password})
        .then((response) => {
            if (response.success) {
                location.href = '/login';
            } else {
                console.log(response);
                $('#message').append(`<p class="alert alert-danger">${response}</p>`);
            }
        }
    )};
});

$('Markers').on('click', function() {  
    location.href = '/virtual_items'
    });

$('#storeregister').on('click', function() {
    const name = $('#username').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirm-password').val();
    const lat = $('#lat').val();
    const lon = $('#lon').val();
    const instr = $('#instr').val();
    const exists = stores.find(store => store.name === name);

    if (exists == undefined && password === confirmPassword)
    {
        $.post(`${API_URL}/storeregistration`, { name, password, lat, lon, instr })
        .then((response) =>{
        if (response.success) {
            location.href = '/login';
            } 
        else {
            $('#message').append(`${response}`);
        }
        });
    }
    else
    {
        var newText = "The account've already existed or the confirm password is not match";
        $('#message').text(newText);
    }
});

$('#login').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val();
    $.post(`${API_URL}/authenticate`, { user, password })
    .then((response) =>{
        if (response.success) {
            localStorage.setItem('user', user);
            localStorage.setItem('isAdmin', response.isAdmin);
            location.href = '/playerhomepage';
    } else {
        $('#message').append(`<p class="alert alert-danger">${response}</p>`);
        }
    });
});

$('#loginstore').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val();
    $.post(`${API_URL}/authenticate`, { user, password })
    .then((response) =>{
        if (response.success) {
            localStorage.setItem('user', user);
            localStorage.setItem('isAdmin', response.isAdmin);
            location.href = '/store';
    } else {
        $('#message').append(`<p class="alert alert-danger">${response}</p>`);
        }
    });
});
   
const logout = () => {
    localStorage.removeItem('user');
    location.href = '/login';
    }



