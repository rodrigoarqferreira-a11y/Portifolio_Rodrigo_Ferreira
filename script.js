// Efeito de fundo no menu ao rolar a página
window.addEventListener("scroll", function () {
    const nav = document.querySelector(".nav");

    if (window.scrollY > 100) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// Menu mobile (hambúrguer)
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    menuToggle.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
});

// Fecha o menu mobile ao clicar em um link
document.querySelectorAll(".menu a").forEach(function (link) {
    link.addEventListener("click", function () {
        menu.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    });
});

// Filtro de categorias no portfólio
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".item");

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const filter = button.getAttribute("data-filter");

        // Atualiza o botão ativo
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");

        // Mostra ou esconde os projetos conforme a categoria
        projectItems.forEach(function (item) {
            const category = item.getAttribute("data-category");

            if (filter === "todos" || filter === category) {
                item.classList.remove("hidden");
            } else {
                item.classList.add("hidden");
            }
        });
    });
});

// Lightbox / galeria de fotos por projeto
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxTitle = document.getElementById("lightbox-title");
const lightboxCounter = document.getElementById("lightbox-counter");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");

let currentImages = [];
let currentIndex = 0;
let currentTitle = "";

function openLightbox(images, title, startIndex) {
    currentImages = images;
    currentTitle = title;
    currentIndex = startIndex;
    updateLightbox();
    lightbox.classList.add("open");
}

function updateLightbox() {
    lightboxImg.src = currentImages[currentIndex];
    lightboxImg.alt = currentTitle;
    lightboxTitle.textContent = currentTitle;
    lightboxCounter.textContent = (currentIndex + 1) + " / " + currentImages.length;
}

function closeLightbox() {
    lightbox.classList.remove("open");
}

projectItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const images = item.getAttribute("data-images").split(",").map(function (src) {
            return src.trim();
        });
        const title = item.getAttribute("data-title");

        openLightbox(images, title, 0);
    });
});

lightboxClose.addEventListener("click", closeLightbox);

lightboxNext.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightbox();
});

lightboxPrev.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightbox();
});

// Fecha clicando fora da imagem
lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Navegação pelo teclado
document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") lightboxNext.click();
    if (e.key === "ArrowLeft") lightboxPrev.click();
});
