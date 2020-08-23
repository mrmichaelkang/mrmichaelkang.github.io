//////////////////////
//     Variables   ///
//////////////////////

let navbar = document.querySelector(".navbar");
let links = document.querySelectorAll(".nav-item a");

// Up Arrow to navigate back to top of web page
let upArrow = document.querySelector(".up-arrow");
let navbarToggler = document.querySelector(".navbar-toggler");
let downArrow = document.querySelector(".down-arrow-btn");

// Carousel
let carouselContainer = document.querySelectorAll(".project-item-container");
let carouselList = document.querySelectorAll(".project-item");
let carouselIndex = 0;
let nextBtn = document.querySelector(".next-btn");
let prevBtn = document.querySelector(".prev-btn");

//////////////////////
//     Functions   ///
//////////////////////

function smoothScroll(target, duration) {
  let targetElement = document.querySelector(target);
  let targetPosition = targetElement.getBoundingClientRect().top - navbar.clientHeight;
  let startPosition = window.pageYOffset;
  var startTime = null;

  function animation(currentTime) {
    if(startTime === null) {
      startTime = currentTime;
    }
    let timeElasped = currentTime - startTime;
    let run =  ease(timeElasped, startPosition, targetPosition, duration);
    window.scrollTo(0, run);

    if(timeElasped < duration) {
      requestAnimationFrame(animation);
    }
  }

  // t: time elasped
  // b: start position
  // c: target position
  // d: duration
  function ease(t, b, c, d) {
    t /= d / 2;
    if(t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);

}

function navbarAnimation() {
  let opacity = 0;

  if(window.innerWidth > 768) {
    opacity = scrollY / 500;
  } else {
    opacity = 1;
  }
  navbar.style.backgroundColor = `rgba(34,34,34, ${opacity})`;
}

// @param value
// - if value is positive, we move forward
// - if value is negatove, we move backwards
function carouselAnimation(value) {
  let newIndex = carouselIndex + value;

  if(newIndex < 0) {
    carouselIndex = Math.max(carouselIndex, newIndex);
  } else if(newIndex >= carouselList.length) {
    carouselIndex = Math.min(carouselIndex, newIndex);
  } else {
    carouselIndex = newIndex;
  }

  let currentItem = carouselList[carouselIndex];
  currentItem.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center"
  });
}
//////////////////////
// Event Listeners ///
//////////////////////

// Navbar appearance on scoll
window.addEventListener("scroll", navbarAnimation);
window.addEventListener("resize", navbarAnimation);

// Smooth scroll effect for Links
links.forEach(link => {
  link.addEventListener("click", function() {
    let target = link.getAttribute("href");
    smoothScroll(target, 1000);
    navbarToggler.click();
  });
});

// Active Navigation bar
// window.addEventListener("scroll", () => {
//   links.forEach(function(link) {
//     let fromTop = window.scrollY;
//     let section = document.querySelector(link.getAttribute("href"));

//     if(section.offsetTop - navbar.clientHeight <= fromTop && 
//       section.offsetHeight + section.offsetTop > fromTop + navbar.clientHeight) {
//         link.classList.add("active");
//       } else {
//         link.classList.remove("active");
//       }
//   });
// });

// Navbar Toggler
navbarToggler.addEventListener("click", function() {
  let navbarMenuList = document.querySelector(".navbar-menu-list");
  navbarMenuList.classList.toggle("display");
});


// Back to top button
window.addEventListener("scroll", () => {
  upArrow.style.opacity = scrollY / 600;
});
upArrow.addEventListener("click", () => {
  let target = document.querySelector(".up-arrow-btn").getAttribute("href");
  smoothScroll(target, 1000);
});

// Down arrow to about me section
downArrow.addEventListener("click", () => {
  let target = downArrow.getAttribute("href");
  smoothScroll(target, 1000);
});

// Carousel Animation
nextBtn.addEventListener("click",() => {
  carouselAnimation(1);
});
prevBtn.addEventListener("click", () => {
  carouselAnimation(-1);
});