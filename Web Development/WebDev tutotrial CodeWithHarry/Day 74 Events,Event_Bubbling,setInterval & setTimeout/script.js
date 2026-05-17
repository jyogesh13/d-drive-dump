let button = document.querySelector('button');
function submitForm(){
    let form = document.querySelector('.form-example')

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let addr = document.getElementById('address').value;
    console.log(`${name} | ${email} | ${phone} | ${addr}`);
    let form_data = {
        "name": name,
        "email": email,
        "phone": phone,
        "address": addr,
    };
    form.submit();
    form.reset();
    
    setTimeout(()=>{
        alert('Form Submitted!!!')
    }, 500);
    return false;
};
