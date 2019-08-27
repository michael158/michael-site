$(document).ready(function(){

    var flickrParameters = {
        api_key: '7d1ddffb7292292cb851d4030304b6c8',
        method: 'flickr.people.getPublicPhotos',
        format: 'json',
        user_id: '151287288@N06',
        extras: 'url_l',
        per_page: 20
    };

    getPhotos();

    function getPhotos(){
        $.ajax({
            method: 'POST',
            url: 'https://api.flickr.com/services/rest',
            data: flickrParameters,
            dataType: 'html'
        }).success(function(photos) {
            // vamos remover conteudo lixo
            var initFrom = photos.indexOf('(');
            var jsonData = JSON.parse(photos.substring(initFrom + 1, photos.length - 1));
            insertToShowPhotos(jsonData.photos.photo);
        }).error(function (xhr, ajaxOptions, thrownError){
            console.log(xhr);
            console.log(ajaxOptions);
            console.log(thrownError);
        });
    }

    function insertToShowPhotos(photos) {
        var div = $('#GALLERY .row');
        var html = '';

        photos.forEach(function(item, index){
            html += '<div class="col-sm-4 " style="padding: 2px!important;">';
            html += '   <a  href="'+ item.url_l + '" target="_blank"> <img alt="' + item.title +'" src="' + item.url_l + '" class="img-responsive" ></a>';
            html += '</div>';
        })

        div.append(html);
    }


})