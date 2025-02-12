import { getSessionDetails,
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
   
    getSessionDetails().then(data=>{
        // console.log(data);
        
    })
})
