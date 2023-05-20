const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counter = document.querySelectorAll(".counter span");
const progres_bars = document.querySelectorAll(".skills svg circle");

const ml_section = document.querySelector(".milestones");
const ml_counter = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modale_overly = document.querySelector(".modale-overly");
const images = document.querySelectorAll(".iamges img");
const prev_btn = document.querySelector(".prv-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggel-btn");

const humberger = document.querySelector(".haumburger");

window.addEventListener("scroll", () => {
  activeLink();
  if (!skillsPlayed) skillsCouner();
  if (!mlPlayed) mlCounter();
});

function updateCounter(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCounter(num, maxNum);
    }, 12);
  }
}

/*---------- Sticky Navbar ------------*/

function stickyNavbar() {
  header.classList.toggle("Scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- Skills Progres Bar Animation --------------- */

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;

  if (window.innerHeight >= topPosition + el.offsetHeight) return true;
  return false;
}

let skillsPlayed = false;

function skillsCouner() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counter.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progres_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCounter(counter, target);
    }, 400);
  });

  progres_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards")
  );
}

/* --------------- Servies Counter Animation --------------- */

let mlPlayed = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayed = true;
  ml_counter.forEach((ctr) => {
    let target = +ctr.dataset.target;

    setTimeout(() => {
      updateCounter(ctr, target);
    }, 400);
  });
}

/* --------------- Portfoil filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

/* --------------- PModal pop up Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    console.log('click');
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  })
);

modale_overly.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 7;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if (currentIndex === 7) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

/* --------------- Change Active Link On Scroll --------------- */

function activeLink() {
  let sections = document.querySelectorAll("section[id]");
  let passedSection = Array.from(sections).map((sct, i) => {
    return {
      y: sct.getBoundingClientRect().top - header.offsetHeight,
      id: i,
    };
  }).filter(sct => sct.y <= 0);
  let currSectionID = passedSection.at(-1).id;
  

  links.forEach(l => l.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

activeLink();



/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");
changeTheme(+firstTheme)

function changeTheme(idDark) {
  if(idDark) {
    document.body.classList.add("dark");
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}


toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
})



/*---------- Open & Close Navbar Menu ------------*/

humberger.addEventListener('click', () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});

links.forEach(link => link.addEventListener("click", () => {
  document.body.classList.remove("open");
  document.body.classList.remove("stopScrolling");
}))

