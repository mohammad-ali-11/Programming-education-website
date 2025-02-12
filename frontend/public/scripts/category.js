import { login } from "./funcs/auth.js";
import { getAndShowCategoryCourses,
   insertCourseBoxHtmlTemplate,
   coursesSorting,
   getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
   showOpenNavbar,
   showUserProfileNavbarMobile,
   showUserProfileSidebarMobile,
  
  } from "./funcs/shaed.js";
import { searchInArray,paginateItem,getUrlparam,addparamToUrl } from "./funcs/utils.js";
window.addparamToUrl=addparamToUrl

let currentFilter = 'default'; 
window.addEventListener("load", () => {
        
  getAndShowNavbarMenusMobile()
  showAndHiddeSidebar()
  showCloseNavbar()
 showOpenNavbar()
 showUserProfileNavbarMobile()
 showUserProfileSidebarMobile()
  getAndShowCategoryCourses().then((responseCourses) => {
    let courses = [...responseCourses];
    let coursesShowType = "row";
    const coursesShowTypeIcons = document.querySelectorAll(
      ".courses-top-bar__icon-parent"
    );
    console.log(coursesShowTypeIcons);
    
    const categoryCoursesWrapper = document.querySelector("#category-courses-wrapper");
    console.log(categoryCoursesWrapper);
    
    const categoryCoursesWrapperRow = document.querySelector( "#category-courses-wrapper-row");
    const selectionTitleElem=document.querySelector('.courses-top-bar__selection-title')
    const coursesFilteringSelections=document.querySelectorAll('.courses-top-bar__selection-item')
    const coursesSearchInput=document.querySelector('.courses-top-bar__input')


   // بررسی مقدار قبل از ارسال
   if (!categoryCoursesWrapperRow) {
    console.error("categoryCoursesWrapperRow مقدار ندارد! بررسی کنید که المنت در DOM وجود دارد.");
    return;
}
 
    
  
    // Show Category Courses By row showType
    if (courses.length) {
      insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow)
    
    } else {
      categoryCoursesWrapper.insertAdjacentHTML(
        "beforeend",
        `
          <div class=" col-start-1 col-end-4 h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" >هیچ دوره ای برای این دسته بندی وجود ندارد </div>
              
            `
      );
      // categoryCoursesWrapperRow.insertAdjacentHTML(
      //   "beforeend",
      //   `
      //     <div class=" col-start-1 col-end-4 h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" >هیچ دوره ای برای این دسته بندی وجود ندارد </div>
      //        `
      // );
    }

    
    // Show Category Courses By row showType (user selection)
    coursesShowTypeIcons.forEach((coursesShowTypeIcon) => {
      coursesShowTypeIcon.addEventListener("click", (event) => {
        coursesShowTypeIcons.forEach((icon) =>
          icon.classList.remove("courses-top-bar__icon--active")
        );
        event.target.classList.add("courses-top-bar__icon--active");

        if (String(event.target.className).includes("row")) {
          coursesShowType = 'row'
          insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow)
        } else {
          coursesShowType = 'column'
          insertCourseBoxHtmlTemplate(courses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow)
        }

          // اعمال فیلتر و نمایش دوره‌ها با نوع نمایش جدید
    let shownCourses = coursesSorting([...courses], currentFilter);  // استفاده از currentFilter برای فیلتر دوره‌ها
    insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow );
      });
    });
    
    // Show Category Courses By user filtering method
    coursesFilteringSelections.forEach((coursesFilteringSelection)=>{
      coursesFilteringSelection.addEventListener('click',(event)=>{
        coursesFilteringSelections.forEach((SelectionElem) =>
          SelectionElem.classList.remove("courses-top-bar__selection-item--active"))

        event.target.classList.add("courses-top-bar__selection-item--active")

        selectionTitleElem.innerHTML=''
        selectionTitleElem.insertAdjacentHTML('beforeend',`
          ${event.target.innerHTML}
          <li class="courses-top-bar__selection-item ">  </li>
          `)
      
          
          let useFilteringSelection=event.target.dataset.key
          // console.log(event.target.dataset.key);
          currentFilter=useFilteringSelection
          let shownCourses=coursesSorting([...courses],useFilteringSelection)
            insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow)
          // console.log(shownCourses);

      
          
      })
    })
    // Handel search in courses
    coursesSearchInput.addEventListener('input',event=>{
      // console.log(event.target.value);
      const  shownCourses=searchInArray([...responseCourses],'name',event.target.value)
      // console.log(shownCourses.length);
      
      if (shownCourses.length) {
        insertCourseBoxHtmlTemplate(shownCourses, coursesShowType, categoryCoursesWrapper,categoryCoursesWrapperRow)

      }else{
        categoryCoursesWrapper.innerHTML=''
        categoryCoursesWrapperRow.innerHTML=''
        categoryCoursesWrapper.insertAdjacentHTML(
          "beforeend",
          `
            <div class=" col-start-1 col-end-4 h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" >هیچ دوره ای برای جستجوی شما وجود ندارد </div>
              
              `
        );
       
      }
      // console.log(shownCourses);
      

      
    })
    // Handel pagnation
    const coursesPaginationList=document.querySelector('.courses-pagination-list')
    // console.log('12121212121',coursesPaginationList);
    
    const coursePagnationBtn=document.querySelector('.courses-pagination-link')
    // console.log(coursesPaginationList);
    
  const currentpage=getUrlparam('page')
  // console.log('currentpage',currentpage);
  // console.log('responseCourses',responseCourses);
  
  // console.log('232323232323',paginateItem([...responseCourses],3,coursesPaginationList,currentpage));
  
   const shownCourses= paginateItem([...responseCourses],2,coursesPaginationList,currentpage)
  //  console.log(shownCourses);
   insertCourseBoxHtmlTemplate([...shownCourses],coursesShowType='row',categoryCoursesWrapper,categoryCoursesWrapperRow)
   
  //  insertCourseBoxHtmlTemplate([...shownCourses],coursesShowType='column',categoryCoursesWrapper,categoryCoursesWrapperRow)
  //  console.log('shownCourses',shownCourses);
   
  // //  categoryCoursesWrapperRow.innerHTML = "";
  // //  categoryCoursesWrapper.innerHTML = "";
  // coursePagnationBtn.addEventListener('click',
  //   insertCourseBoxHtmlTemplate([...shownCourses],coursesPaginationList, categoryCoursesWrapper,categoryCoursesWrapperRow)
  // )

// console.log('coursesPaginationList');

  });
  // return paginateItem
});