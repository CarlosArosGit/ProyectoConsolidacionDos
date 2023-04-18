$(document).ready(function () {
    var subirBtn = document.getElementById("subirBtn");
    $('#parrafoMasInfo').hide();
    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(datos => {
            console.log(datos)
            cards(datos)

        })
    function cards(datos) {
        var row = document.getElementById('digimonInfo');
        for (var i=0; i< datos.length; i++) {
            var section = document.createElement('div');
            var card = document.createElement('div');
            var img = document.createElement('img');
            var titulo = document.createElement('h3');
            var nivel = document.createElement('p');
            
            section.classList.add('col-lg-3');
            card.classList.add('text-center');
            card.classList.add('align-items-center');
            img.src = datos[i].img;
            img.classList.add('imgCard');
            titulo.classList.add('colorWhite');
            nivel.classList.add('colorWhite');
            nivel.classList.add('mbtm');
            titulo.innerHTML = datos[i].name;
            nivel.innerHTML = 'Nivel: '+datos[i].level;
            card.appendChild(img);
            card.appendChild(titulo);
            card.appendChild(nivel);
            section.appendChild(card);
            row.appendChild(section);
        }
        subirBtn.style.display = "block";
    }
    var modal = document.getElementById("myModal");
    $("#btnB").click(function () {

        var nameD = $('#nameD').val();
        if (nameD != '') {
            fetch('https://digimon-api.vercel.app/api/digimon/name/' + nameD)
                .then(response => response.json())
                .then(datos => {
                    $('#nomnreD').text(datos[0].name);
                    $("#my_image").attr("src", datos[0].img);
                    $('#levelD').text('NIVEL: ' + datos[0].level);
                    modal.style.display = "block";
                    $('#nameD').val('');
                }).catch(function () {
                    alert('Ingresa un nombre valido de un digimon');
                    $('#nameD').val('');
                });
        } else {
            alert('Ingresa el nombre del digimon a buscar');
        }

    });
    $("#close1").click(function () {
        modal.style.display = "none";
        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
        $('#nameD').val('');
    });
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }

    $('#masInfo').mouseout(function () {
        $('#parrafoMasInfo').hide();
    });
    $('#masInfo').mouseover(function () {
        $('#parrafoMasInfo').show();
    });
});
$(document).keyup(function (event) {
    if (event.which === 13) {
        $("#btnB").click();
    }
});

