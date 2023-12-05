const contact = {
    logInputValues: () => {
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;

        console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
    },
};

document
    .querySelector(".contact__button")
    .addEventListener("click", contact.logInputValues);

export default contact;
