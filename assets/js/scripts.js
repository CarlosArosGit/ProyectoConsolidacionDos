$(document).ready(function () {
    var subirBtn = document.getElementById("subirBtn");
    $('#parrafoMasInfo').hide();
    var contenido = document.querySelector('#contenido');
    fetch('https://digimon-api.vercel.app/api/digimon')
        .then(response => response.json())
        .then(datos => {
            console.log(datos)
            tabla(datos)

        })

    function tabla(datos) {
        contenido.innerHTML = '';

        for (let temp of datos) {
            contenido.innerHTML +=
                `  <tr>
                <td><p id="nombreDDD">${temp.name}</p></td>
                <td><img src="${temp.img}" alt="" id="imgD" height="65px" width="65px"></td>
              </tr>
            `;


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

