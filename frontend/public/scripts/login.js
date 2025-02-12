import{login,getMe,} from  "./funcs/auth.js"
 import { getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,


  } from "./funcs/shaed.js"
const loginBtn=document.querySelector('#login-btn')

loginBtn.addEventListener('click',event=>{
    event.preventDefault()
    login()
})

window.addEventListener('load',()=>{
  
        
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()

   
})
