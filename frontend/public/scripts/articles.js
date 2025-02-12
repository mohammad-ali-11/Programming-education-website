import { getAndShowAllArticles,
    getAndShowArticleNew,
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,
   insertCourseBoxHtmlTemplate 
} from "./funcs/shaed.js";
import { paginateItem,getUrlparam,addparamToUrl} from "./funcs/utils.js";
window.addparamToUrl=addparamToUrl
window.addEventListener('load',()=>{
    getAndShowAllArticles(),
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()
   getAndShowArticleNew().then(articles=>{
    // console.log('777777777777777',articles);
    
    const categoryCoursesWrapperRow = document.querySelector( "#category-courses-wrapper-row");
    const coursesWrapperElem=document.querySelector('#articles-wrapper-article')
    const coursespagintionwrapperelem=document.querySelector('#courses-pagintion')
    const currentpage=getUrlparam('page')

// console.log('1414141414',paginateItem([...articles],3,coursespagintionwrapperelem,currentpage));

    let shownCourses= paginateItem([...articles],3,coursespagintionwrapperelem,currentpage)
    // console.log(shownCourses);
    insertCourseBoxHtmlTemplate([...shownCourses],'row',coursesWrapperElem,categoryCoursesWrapperRow)
})
})