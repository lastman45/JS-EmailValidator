 // First validator variables
let emailid = document.getElementById("emailid");
let errorMsg = document.getElementById("error-msg");
let icon = document.getElementById("icon");
let mailRegex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/;

function checker() {
    icon.style.display = "inline-block";
    if (emailid.value.match(mailRegex)) {
        icon.innerHTML = '<i class="fas fa-check-circle"></i>';
        icon.style.color = "green";
        errorMsg.style.display = "none";
        emailid.style.border = "2px solid green";
    } else if (emailid.value == "") {
        icon.style.display = "none";
        emailid.style.border = "2px solid #d1d3d4";
        errorMsg.style.display = "none";
    } else {
        icon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        icon.style.color = "red";
        errorMsg.style.display = "block";
        emailid.style.border = "2px solid red";
    }
}

// Second validator variables
let emailfield = document.getElementById("email-field");
let errorMsg2 = document.getElementById("error-msg-2");
let emailLabel = document.getElementById("email-label");
let inputGroup = document.querySelector('.input-group');

function validateEmail() {
    if (!emailfield.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        errorMsg2.innerHTML = "Invalid Email Address";
        emailfield.style.borderBottomColor = "red";
        errorMsg2.style.top = "120%";
        errorMsg2.style.display = "block";
        return false;
    } else {
        errorMsg2.innerHTML = "";
        emailfield.style.borderBottomColor = "green";
        errorMsg2.style.top = "100%";
        errorMsg2.style.display = "none";
        return true;
    }
}

function focusInput() {
    inputGroup.classList.add('focused');
}

function blurInput() {
    inputGroup.classList.remove('focused');
    if (emailfield.value.trim() !== '') {
        inputGroup.classList.add('filled');
    } else {
        inputGroup.classList.remove('filled');
    }
}