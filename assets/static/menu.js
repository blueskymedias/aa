//menu js
let currentMenu = 'indian';
let currentCategory = 'all';

function switchMenu(menu) {
    currentMenu = menu;
    document.getElementById("indian-tab").classList.toggle("active", menu === "indian");
    document.getElementById("chinese-tab").classList.toggle("active", menu === "chinese");
    document.getElementById('indian-tabs').style.display = menu === 'indian' ? 'flex' : 'none';
    document.getElementById('chinese-tabs').style.display = menu === 'chinese' ? 'flex' : 'none';
    switchCategory('all', menu);
}

function switchCategory(category, menu) {
    if (menu !== currentMenu) return;
    currentCategory = category;
    document.querySelectorAll(`#${menu}-tabs .tab`).forEach(tab => tab.classList.remove("active"));
    document.querySelector(`#${menu}-tabs [data-category="${category}"]`).classList.add("active");
    filterMenu();
}

function filterMenu() {
    let vegFilter = document.getElementById('vegFilter').value;
    let searchQuery = document.getElementById('search').value.toLowerCase();
    let found = false;

    document.querySelectorAll('.menu-item').forEach(item => {
        let match = (currentMenu === item.getAttribute('data-menu')) &&
                    (currentCategory === 'all' || currentCategory === item.getAttribute('data-category')) &&
                    (vegFilter === 'all' || vegFilter === item.getAttribute('data-type')) &&
                    (item.textContent.toLowerCase().includes(searchQuery));

        item.style.display = match ? 'block' : 'none';
        if (match) found = true;
    });

    document.getElementById('no-items').style.display = found ? 'none' : 'block';
}


document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");
    
    tabs.forEach(tab => {
    tab.addEventListener("click", function () {
      // Remove active classes from tabs and contents
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(content => content.classList.remove("active"));
    
      // Activate the clicked tab and its corresponding content
      this.classList.add("active");
      const target = this.getAttribute("data-tab");
      document.getElementById(target).classList.add("active");
});
});
});



//image slider js
const slides = document.querySelector('.slides');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let index = 0;

// Function to show a specific slide
function showSlide(idx) {
const slideWidth = slides.children[0].offsetWidth;
slides.style.transform = `translateX(${-idx * slideWidth}px)`;
}

// Function to move to the next slide
function nextSlide() {
index = (index < slides.children.length - 1) ? index + 1 : 0;
showSlide(index);
}

// Function to move to the previous slide
function prevSlide() {
index = (index > 0) ? index - 1 : slides.children.length - 1;
showSlide(index);
}

// Automatically switch slides every 3 seconds
let autoSlide = setInterval(nextSlide, 3000);

// Pause slider on hover
const slider = document.querySelector('.slider');
slider.addEventListener('mouseover', () => clearInterval(autoSlide));
slider.addEventListener('mouseout', () => autoSlide = setInterval(nextSlide, 3000));