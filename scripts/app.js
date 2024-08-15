const searchButton = document.querySelector(".search-button");

// Función para crear una tarjeta para cada show
const createCard = (show) => {
    const cardTvShow = document.createElement("div"); 
    cardTvShow.classList.add("card-tv-show"); 

    const nameShow = document.createElement("h2");
    nameShow.classList.add("card-tv-show-name");
    nameShow.textContent = show.name;

    const nameSpan = document.createElement("span");
    nameSpan.classList.add("show-genres");
    nameSpan.textContent = show.genres;

    cardTvShow.appendChild(nameShow);
    cardTvShow.appendChild(nameSpan);

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");

    const images = document.createElement("img");
    images.classList.add("images-show");

    if (show.image && show.image.medium) {
        images.src = show.image.medium;
    } else {
        images.src = "/assets/img/image-not-found.png";
    }

    const moreInfoButton = document.createElement("button");
    moreInfoButton.classList.add("infoButton");
    moreInfoButton.textContent = "Más información";

    const linkButton = document.createElement("a");
    linkButton.classList.add("buttonLink");
    linkButton.href = '#footer';

    linkButton.appendChild(moreInfoButton);

    imageContainer.appendChild(images);
    cardTvShow.appendChild(imageContainer);
    cardTvShow.appendChild(linkButton);

    cardTvShow.addEventListener("mouseenter", () => {
        cardTvShow.classList.replace("card-tv-show", "card-tv-show-two");
    });

    cardTvShow.addEventListener("mouseleave", () => {
        cardTvShow.classList.replace("card-tv-show-two", "card-tv-show");
    });

    // aqui utilizo el primer axios para llamar el segundo endpoint a la api
    moreInfoButton.addEventListener("click", async () => {
        const infoShowSection = document.querySelector(".info-show");
        const idShow = show.id;
        console.log(idShow);

        try {
            const response = await axios.get(`https://api.tvmaze.com/shows/${idShow}`);
            console.log(response);

            infoShowSection.innerHTML = ''; // se limpian los resultados anteriores

            const tvShowInfoCard = createCardInfo(response.data);
            infoShowSection.appendChild(tvShowInfoCard);

        } catch (error) {
            console.error("Error al realizar la llamada a la API:", error);
        }
    });

    return cardTvShow;
};

// Función para crear la tarjeta de informacion adicional
const createCardInfo = (show) => {
    const cardInfoShow = document.createElement("div");
    cardInfoShow.classList.add("card-info-show"); 
    
   
    const nameInfoShow = document.createElement("h2");
    nameInfoShow.classList.add("card-info-show-name");
    nameInfoShow.textContent = show.name;

   
    const genresInfoSpan = document.createElement("p");
    genresInfoSpan.classList.add("show-info-genres");
    genresInfoSpan.textContent = show.genres;

    cardInfoShow.appendChild(nameInfoShow);
    cardInfoShow.appendChild(genresInfoSpan);

    const imageInfoContainer = document.createElement("div");
    imageInfoContainer.classList.add("image-info-container");

    const imagesInfo = document.createElement("img");
    imagesInfo.classList.add("images-info-show");

    if (show.image && show.image.medium && show.image.original) {
        imagesInfo.src = show.image.medium;
    } else {
        imagesInfo.src = "/assets/img/image-not-found.png";
    }

    imageInfoContainer.appendChild(imagesInfo);
   // cardInfoShow.appendChild(imageInfoContainer);

    const oficialSiteInfo = document.createElement("p");
    oficialSiteInfo.classList.add("oficialsite-info");
    oficialSiteInfo.textContent = `Official Site: ${show.officialSite}`;

    const premieredInfo = document.createElement("p");
    premieredInfo.classList.add("premiered-info-show");
    premieredInfo.textContent = `Premiered: ${show.premiered}`;

    const countryInfo = document.createElement("p");
    countryInfo.classList.add("country-info");
    countryInfo.textContent = `Country: ${show.network ? show.network.country.name : 'N/A'}`;

    const sumaryInfo = document.createElement("p");
    sumaryInfo.classList.add("summary-info");
    sumaryInfo.innerHTML = `Summary: ${show.summary || 'No summary available'}`;

    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container-div");

    const containerInfoImg = document.createElement("div");
    containerInfoImg.classList.add("container-info-and-img")

    
    
    infoContainer.appendChild(premieredInfo);
    infoContainer.appendChild(countryInfo);
    infoContainer.appendChild(sumaryInfo);
    infoContainer.appendChild(oficialSiteInfo);

    
    containerInfoImg.appendChild(infoContainer);
    containerInfoImg.appendChild(imageInfoContainer);

    cardInfoShow.appendChild(containerInfoImg);

    return cardInfoShow;
};

// agrego evento para buscar shows
searchButton.addEventListener("click", async () => {
    const inputSearch = document.querySelector(".search-input").value.toLowerCase();
    const sectionData = document.querySelector(".results-data");

    console.log(inputSearch);

    try { //utilizo primer end point
        const response = await axios.get(`https://api.tvmaze.com/search/shows?q=${inputSearch}`, { params: { limit: 100 } });
        console.log(response);

        sectionData.innerHTML = ''; 

        // Itera sobre el array obtenido por coincidencias de la api y crea una tarjeta para cada show
        response.data.forEach(result => {
            const show = result.show; // Accede al objeto show
            const tvShowCard = createCard(show);
            sectionData.appendChild(tvShowCard);
        });

    } catch (error) {
        console.error("Error al realizar la llamada a la API:", error);
    }
});


