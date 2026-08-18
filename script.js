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
