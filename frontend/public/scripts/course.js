import {getCourseDetails,
    getAndShowRelatedcourses,
    submitComment,
    
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,
} from './funcs/shaed.js'

window.addEventListener('load',()=>{
    const submitCommentBtn=document.querySelector('.comments__respond-btn')
    getCourseDetails()
    getAndShowRelatedcourses()
        
    submitCommentBtn.addEventListener('click',()=>{
        // console.log('gggggggg');
        
        submitComment()
        
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()
    }
      
)
   
})


  