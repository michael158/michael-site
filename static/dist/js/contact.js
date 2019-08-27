var onloadCallback = function() {
    grecaptcha.render('recaptcha', {
        'sitekey' : '6LfjSCMTAAAAAHkeZ0LpxBhYao3Wj0mNLW0acZgT',
        'callback' : correctCaptcha
    });

};

var correctCaptcha = function (response) {
    var html = '<button type="submit" class="btn btn-primary m-b-15" id="btn-contact" style="width: 100%">Enviar</button>';
    $('#recaptcha').remove();
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

    if(form.valid()){
        $.ajax({
            method: 'post',
            data: form.serialize(),
            url: form.attr('action'),
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
                var html = '<div id="recaptcha" style="margin-bottom: 10px"></div>';
                form.append(html);
                grecaptcha.render('recaptcha', {
                    'sitekey' : '6LfjSCMTAAAAAHkeZ0LpxBhYao3Wj0mNLW0acZgT',
                    'callback' : correctCaptcha
                });
            }
        })
    }

});
