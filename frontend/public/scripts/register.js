import { register } from "./funcs/auth.js"; 
import { getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,


  } from "./funcs/shaed.js"
const registerbtn=document.querySelector("#register-btn")
// console.log('register.js');


registerbtn.addEventListener('click',event=>{
    event.preventDefault()
    register()
})


window.addEventListener('load',()=>{
  
        
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()

   
})