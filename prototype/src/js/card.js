const card = {
    openDetails: () => {
        const detailsElement = document.querySelector(".card__details");
        detailsElement.classList.toggle("card__details--active");
        console.log("You clicked me!");
        console.log("whaazaaup");
    },
};

document
    .querySelector(".card__details")
    .addEventListener("click", card.openDetails);

export default card;
