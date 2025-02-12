import { submitContactUsMsg,

 
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,
 } from "./funcs/shaed.js";
window.addEventListener('load',()=>{
  
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()
   
const submitBtn=document.querySelector('#submit-btn')


submitBtn.addEventListener('click',event=>{
    event.preventDefault()
    submitContactUsMsg()
    // join on NewsLetter
const newsLetterSubmitBtn=document.querySelector('#news-letter-submit-btn')
// console.log(newsLetterSubmitBtn);

newsLetterSubmitBtn.addEventListener('click',event=>{
event.preventDefault()
createNewNewsLettes()
})
})
})