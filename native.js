// promo.js


/* ===========================
   SCROLL PROGRESS BAR
=========================== */

function updateProgress(){

  const scrollTop = window.scrollY
  const docHeight = document.body.scrollHeight - window.innerHeight

  const progress = (scrollTop / docHeight) * 100

  document.querySelector(".cs-progress-bar").style.width =
    progress + "%"

}

window.addEventListener("scroll", updateProgress)



/* ===========================
   SMOOTH SCROLL LINKS
=========================== */

document.querySelectorAll("a[href^='#']")
.forEach(anchor => {

  anchor.addEventListener("click", function(e){

    e.preventDefault()

    const target = document.querySelector(this.getAttribute("href"))

    if(target){

      target.scrollIntoView({
        behavior: "smooth"
      })

    }

  })

})



/* ===========================
   SIMPLE S2S TRIGGER
=========================== */

function checkS2S(){

  const s2s = document.querySelector(".cs-s2s")

  if(!s2s) return

  const rect = s2s.getBoundingClientRect()

  if(rect.top < window.innerHeight){

    s2s.classList.add("visible")

  }

}

window.addEventListener("scroll", checkS2S)