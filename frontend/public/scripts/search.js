import { globalSearch,getAndShowNavbarMenusMobile,
  showAndHiddeSidebar,
  showCloseNavbar,
 showOpenNavbar,
 showUserProfileNavbarMobile,
 showUserProfileSidebarMobile,


} from "./funcs/shaed.js"
window.addEventListener('load',()=>{
      
  getAndShowNavbarMenusMobile()
  showAndHiddeSidebar()
  showCloseNavbar()
 showOpenNavbar()
 showUserProfileNavbarMobile()
 showUserProfileSidebarMobile()
   globalSearch().then(data=>{
     console.log(data);
      
   })
})
