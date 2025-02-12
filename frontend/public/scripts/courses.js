import { getAllCouses,
    insertCourseBoxHtmlTemplate,
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,

 } from "./funcs/shaed.js";
import { paginateItem,getUrlparam,addparamToUrl} from "./funcs/utils.js";
window.addparamToUrl=addparamToUrl
window.addEventListener('load',()=>{
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()
    getAllCouses().then(courses=>{
        // console.log('33233333',courses);
        
        const categoryCoursesWrapperRow = document.querySelector( "#category-courses-wrapper-row");
        const coursesWrapperElem=document.querySelector('#courses-wrapper')
        const coursespagintionwrapperelem=document.querySelector('#courses-pagintion')
        const currentpage=getUrlparam('page')


        let shownCourses= paginateItem([...courses],3,coursespagintionwrapperelem,currentpage)
        // console.log(shownCourses);
        insertCourseBoxHtmlTemplate([...shownCourses],'row',coursesWrapperElem,categoryCoursesWrapperRow)
    })
})