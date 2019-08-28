var onloadCallback = function() {
    grecaptcha.render('recaptcha', {
        'sitekey' : '6LfjSCMTAAAAAHkeZ0LpxBhYao3Wj0mNLW0acZgT',
        'callback' : correctCaptcha
    });

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

    if(isCaptchaChecked())
        sendMail();
});



function isCaptchaChecked() {
    return grecaptcha && grecaptcha.getResponse().length !== 0;
}





function sendMail() {
    let data = getContactData();
    let apiKey = 'key-c59268153cedf8d8488744c5b0dafe5e';

    let url = 'https://api:'+ apiKey + '@api.mailgun.net/v3/mailgun.michaeldeveloper.com.br/messages';

    $.ajax({
        method: 'post',
        data:data,
        url: url,
        dataType: 'json',
        beforeSend: function () {
            swal({
                title: "Enviando!",
                text: "Aguarde a mensagem está sendo enviada...",
                showConfirmButton: false,
                allowOutsideClick: false
            });
        },
        success: function (data) {
            swal("Sucesso!", data.message.content, data.message.type);
        },
        error: function (data) {
            var obj = $.parseJSON(data.responseText);
            swal("Erro!", obj.message.content, obj.message.type);
        },
        complete: function () {
            form.trigger('reset')
            $('#btn-contact').remove();
            grecaptcha.render('recaptcha', {
                'sitekey' : '6LfjSCMTAAAAAHkeZ0LpxBhYao3Wj0mNLW0acZgT',
                'callback' : correctCaptcha
            });
        }
    })
}


function getContactData() {
    let name = $('input[name=name]', form).val();
    let email = $('input[name=email]', form).val();
    let message =  $('textarea[name=message]', form).val();

    return {
        from : email,
        to : 'michael.dsa41@gmail.com',
        subject: 'Contato do site michael.dev <'+ name +'>',
        text: message,
    };
}



