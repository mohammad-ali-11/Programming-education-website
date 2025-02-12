import { getAllArticles,
    getAndShowArticleNew,
    getAndShowFastAccess,
    submitCommentArticle,
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,
    // getAndShowRelatedArticle
 } from "./funcs/shaed.js";
window.addEventListener('load',()=>{
    getAllArticles()
    getAndShowArticleNew()
    getAndShowFastAccess()
    submitCommentArticle()
          
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
   showOpenNavbar()
   showUserProfileNavbarMobile()
   showUserProfileSidebarMobile()
    // getAndShowRelatedArticle()
})