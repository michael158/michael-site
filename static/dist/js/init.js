$(document).ready(function () {
    $('html').niceScroll();
    // Margem do topo
    var navbarOffset = $('.navbar').height();
    var windowHeight = $(window).height();

    if(windowHeight >= 653){
        $('#HOME').css('height', windowHeight);
    }else{
        $('#HOME').css('height', 653);
    }

    $('body').scrollspy({
        target: '#menu',
        offset: navbarOffset
    });

    $('a.page-navigation').click(function(event) {
        event.preventDefault();
        // pega a distancia do destino em relação ao topo
        var targetOffset = $($(this).attr('href')).offset().top;
        // faz o scroll até o destino retirando o offset do navbar fixado no topo
        $('html, body').animate({scrollTop: targetOffset - navbarOffset }, 800);
    });

    $(window).on('scroll', function () {
        var top = window.pageYOffset || document.documentElement.scrollTop
        var homeCoverHeight = $('#HOME').height();
        var calc = homeCoverHeight - navbarOffset;
        var nav = $('.navbar');
        if(top >= calc){
            if(nav.hasClass('no-background')){
                nav.removeClass('no-background').fadeOut(0);
                nav.addClass('whit-background').fadeIn(300);
            }
        }else{
            if(!nav.hasClass('no-background')){
                nav.removeClass('whit-background');
                nav.addClass('no-background');
            }
        }
    })

    $('[data-toggle="tooltip"]').tooltip();

});