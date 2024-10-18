function submitLogin(event) {
    event.preventDefault();
    
   
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const message = document.getElementById('message');
    const message2 = document.getElementById('message2');
    const Email = document.getElementById('Email');
    
    message.innerText = '';

   
    if (!username) {
        message.innerText = 'Please enter your username';
        return;
    }
    
    if (!password) {
        message.innerText = 'Please enter your password';
        return;
    }
    
   
    if (password.length < 13) {
        message.innerText = 'Password must be 13 characters long';
        return;
    }

  
    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUcd6e79be491776e1d2627fa8b407ca3b38122183c259bf0496bbb48705a0a0068578d718cdf54c681c9ec23c8284f5a8'
        },
        body: JSON.stringify({
            UserName: username, 
            PassWord: password
        })
    })
    .then(response => response.json())
    .then(data => {  
        if (data.displayname_th) {
            message.innerText = data.displayname_th;
            message2.innerText = data.displayname_en;
            Email.innerText = data.email;
        } else {
            message.innerText = 'Login failed. Please try again';
        }
    })
    .catch(error => {
        message.innerText = 'Error: ' + error.message;
        console.error('Error:', error);
    });
}
