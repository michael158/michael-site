emailjs.init("user_mdEhcWYvg9Yl6uclgSRSv");


var onloadCallback = function () {
    renderCaptcha();
};

var correctCaptcha = function (response) {
    var html = '<button type="submit" class="btn btn-primary m-b-15" id="btn-contact" style="width: 100%">Enviar</button>';
    // $('#recaptcha').remove();
    $('#form-contact').append(html);
};

jQuery.extend(jQuery.validator.messages, {
    required: "Esse campo é obrigatório.",
    email: "Por favor insira um endereço de email válido.",
});

var form = $('#form-contact');

form.validate();


$(document).on('click', '#btn-contact', function (e) {
    e.preventDefault();

    if (isCaptchaChecked())
        sendMail();
});


function isCaptchaChecked() {
    return grecaptcha && grecaptcha.getResponse().length !== 0;
}


function sendMail() {
    let data = getContactData();

    $('#recaptcha').remove();

    swal({
        title: "Enviando!",
        text: "Aguarde a mensagem está sendo enviada...",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    emailjs.send('mailgun', 'contact', data)
        .then(function (response) {
            swal("Sucesso!", 'Email enviado com sucesso', 'success');

            form.trigger('reset')
            $('#btn-contact').remove();
            renderCaptcha();
        }, function (error) {
            swal("Erro!", error, 'error');
        });
}

function renderCaptcha() {
    var html = '<div id="recaptcha" style="margin-bottom: 10px"></div>';
    form.append(html);

    grecaptcha.render('recaptcha', {
        'sitekey': '6LfjSCMTAAAAAHkeZ0LpxBhYao3Wj0mNLW0acZgT',
        'callback': correctCaptcha
    });
}


function getContactData() {
    let name = $('input[name=name]', form).val();
    let email = $('input[name=email]', form).val();
    let message = $('textarea[name=message]', form).val();

    return {
        name: name,
        email: email,
        subject: 'Contato do site michael.dev ' + name,
        body: message,
    };
}



