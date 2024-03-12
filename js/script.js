
// toggle 
let togle=document.querySelector('#nav-icon')
let nav=document.querySelector('.menu')

togle.onclick=()=>
{
    togle.classList.toggle('fa-xmark')
    nav.classList.toggle('active')
}

// scroll
window.onscroll=()=>
{
    togle.classList.remove('fa-xmark')
    nav.classList.remove('active')
}

// img slider

// function show()
// {
//     for(let i=1;i<=4;i++)
//     {
//         document.getElementById("slide"+i).style.display="inline-block"
//         document.getElementById('slider'+i).style.display='inline-block'
//     }
// }

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



// form validation
 var alphaExp = /^[a-zA-Z\s]+$/
 var passExp = /^([a-zA-Z0-9@*#]{8,15})$/
 var numExp = /^[0-9]*$/
 var emailExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
 var alphaAddExp = /^[a-zA-Z0-9\s,.'-]{3,}$/

function validate() 
{
     //////// name validation ////////////
     let x= document.getElementById("name").value
     if (x == "") {
         document.getElementById("name-error").innerHTML = "Please enter your name"
         document.getElementById("name-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
         document.getElementById("name").focus()
         return false
     }
     else if (!x.match(alphaExp)) {
         document.getElementById("name-error").innerHTML = "Your name should be character only"
         document.getElementById("name-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
         document.getElementById("name").focus()
         return false
     }
     else if (x.length < 6 || x.length > 20) {
         document.getElementById("name-error").innerHTML = "Your Full Name should be b/w of 6 to 20 Character"
         document.getElementById("name-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
         document.getElementById("name").focus()
         return false
     }
     else {
         document.getElementById("name-error").innerHTML = ""
     }
     /////// Email validation /////////
     let y = document.getElementById("mail").value
     if (y == "") {
         document.getElementById("mail-error").innerHTML = "Please Enter Email id"
         document.getElementById("mail-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
         document.getElementById('mail').focus()
         return false
     }
     else if (!y.match(emailExp)) {
         document.getElementById('mail-error').innerHTML = "Your email should be valid"
         document.getElementById("mail-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
         document.getElementById("mail").focus()
         return false
     }
     else {
         document.getElementById("mail-error").innerHTML = ""
     }
      ///////number validation//////////
      let z = document.forms["myform"]["number"].value
      if (z == "") {
          document.getElementById("num-error").innerHTML = "Please enter mobile number"
          document.getElementById("num-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
          document.forms["myform"]["number"].focus()
          return false
      }
      else if (!z.match(numExp)) {
          document.getElementById("num-error").innerHTML = "Your character should be numeric"
          document.getElementById("num-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
          document.forms["myform"]["number"].focus()
          return false
      }
      else if (z.length < 10 || z.length > 12) {
          document.getElementById("mob-error").innerHTML = "Your mobile number should be b/w 10 to 12 in length "
          document.getElementById("num-error").style = "color:red; margin:1px 10px;font-style:italic; font-size:16px;"
          document.forms["myform"]["number"].focus()
          return false
      }
      else {
          document.getElementById("num-error").innerHTML = ""
      }     
}
