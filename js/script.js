const mobileNav = document.getElementById("mobile-nav");
const toggler = document.getElementById("toggler");
const themeButton = document.getElementById("dark-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";
const themeBtn = document.querySelector(".dark-button");
const siteArrow = document.querySelector(".site-arrow");
const loader = document.querySelector(".loader");
const header = document.querySelector(".header");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");
const counters = document.querySelectorAll(".section-title");
const innerCursor = document.querySelector(".inner-cursor");
const outerCursor = document.querySelector(".outer-cursor");
const links = Array.from(document.querySelectorAll("a"));
const buttons = Array.from(document.querySelectorAll("button"));
const content = Array.from(document.querySelectorAll(".content"));

toggler.addEventListener("click", (e) => {
  mobileNav.classList.toggle("is-open");
  toggler.classList.toggle("active");
});

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () => {
  if (document.body.classList.contains(darkTheme)) {
    return "dark";
  } else {
    return "light";
  }
};

const getCurrentIcon = () => {
  if (themeButton.classList.contains(iconTheme)) {
    return "uil-moon";
  } else {
    return "uil-sun";
  }
};

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

function init() {
  setTimeout(() => {
    loader.style.opacity = 0;
    loader.style.display = "block";

    header.style.display = "block";
    main.style.display = "block";
    footer.style.display = "block";
    themeBtn.style.display = "block";
    siteArrow.style.display = "block";
    innerCursor.style.display = "block";
    outerCursor.style.display = "block";

    setTimeout(() => {
      header.style.opacity = 1;
      main.style.opacity = 1;
      footer.style.opacity = 1;
      themeBtn.style.opacity = 1;
      siteArrow.style.opacity = 1;
      toggler.style.opacity = 1;
      innerCursor.style.opacity = 1;
      outerCursor.style.opacity = 1;

      header.style.pointerEvents = "all";
      main.style.pointerEvents = "all";
      footer.style.pointerEvents = "all";
      themeBtn.style.pointerEvents = "all";
      siteArrow.style.pointerEvents = "all";
      toggler.style.pointerEvents = "all";
    }, 50);
  }, 4000);
}

init();

let reviews;
let sliderIndex = 0;

function loadReviews(review) {
  return `
	<div class="review-inner">
	<div class="review-headshot">
		<img src="${review.headshot}" alt="">
	</div>
	<h3 class="review-name">${review.name}</h3>
	<p class="review-status">${review.status}</p>
	<p class="review-description">${review.opinion}</p>
</div>`;
}

async function fetchData() {
  await fetch("./review.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      reviews = data;
      document.querySelector(".review-info").innerHTML = data
        .map(loadReviews)
        .join("");
    });
}

fetchData();

document.querySelector("#arrow-right").addEventListener("click", moveSlider);
document.querySelector("#arrow-left").addEventListener("click", moveSlider);

function moveSlider(event) {
  if (event.currentTarget.id.includes("arrow-right")) {
    sliderIndex === reviews.length - 1 ? (sliderIndex = 0) : sliderIndex++;
  } else {
    sliderIndex === 0 ? (sliderIndex = reviews.length - 1) : sliderIndex--;
  }
  document.querySelector(".review-info").style.transform = `translate(${
    -100 * sliderIndex
  }%)`;
}

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
  let x = e.clientX;
  let y = e.clientY;
  innerCursor.style.left = `${x}px`;
  innerCursor.style.top = `${y}px`;
  outerCursor.style.left = `${x}px`;
  outerCursor.style.top = `${y}px`;
}

links.forEach((link) => {
  link.addEventListener("mouseover", () => {
    innerCursor.classList.add("grow");
  });
  link.addEventListener("mouseleave", () => {
    innerCursor.classList.remove("grow");
  });
});

buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    innerCursor.classList.add("grow");
  });
  button.addEventListener("mouseleave", () => {
    innerCursor.classList.remove("grow");
  });
});

document.getElementById("signIn").addEventListener("click", () => {
  document.querySelector(".sign-in-wrapper").style.display = "flex";
});

document.querySelector(".close_btn_signIn").addEventListener("click", () => {
  document.querySelector(".sign-in-wrapper").style.display = "none";
});

document.getElementById("signUp").addEventListener("click", () => {
  document.querySelector(".sign-up-wrapper").style.display = "flex";
});

document.querySelector(".close_btn_signUp").addEventListener("click", () => {
  document.querySelector(".sign-up-wrapper").style.display = "none";
});

window.addEventListener("scroll", scanElements);
function scanElements() {
  content.forEach((element) => {
    if (isVisible(element)) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}
function isVisible(element) {
  const elementDiv = element.getBoundingClientRect();
  let distanceFromTop = -300;
  return elementDiv.top - window.innerHeight < distanceFromTop ? true : false;
}
