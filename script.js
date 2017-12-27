window.addEventListener('load', ()=>{
    let url = 'https://restcountries.eu/rest/v1/name/';
    let countriesList = $('#countries');
  
    $('#search').click(()=>{
        searchCountry();
    });

    function searchCountry(){
        let countryName = $('#country-name').val();

        if(!countryName.length){
            countryName = 'Poland';
        }

        $.ajax({
            url: url + countryName,
            method: 'GET',
            cache: false,
            success: showCountriesList
        });
        
    }

    function showCountriesList(input){
        countriesList.empty();
        input.forEach((item) =>{
            let $name =  $('<li>').text(item.name);
            let $info = $("<div>");
            let languages = '';
            let currencies = '';

            $('<p>').text(`Capital: ${item.capital}`).appendTo($info)
            $('<p>').text(`Population: ${item.population}`).appendTo($info)
            
            item.currencies.forEach((curr) => {
                currencies += `${curr} `;
            })
            $('<p>').text(`Currency: ${currencies}`).appendTo($info)

            item.languages.forEach((lang) => {
                languages += `${lang} `;
            });
            $('<p>').text(`Languages: ${languages}`).appendTo($info)
            
            $info.appendTo($name);
            $name.appendTo(countriesList);
        });
    }
});