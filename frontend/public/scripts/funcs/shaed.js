import { getMe, login, } from "./auth.js";
import { isLogin,getUrlparam,getToken,showSwal } from "./utils.js";





// Dom watch profile

const  showUserNameInVavbar=()=>{
    const navporofileBox=document.querySelector('#main-header__profile-id')
    // console.log('navporofileBox',navporofileBox);
    
    const isUserLogin=isLogin()
    if (isUserLogin) {
        // debugger;
        const userInfos=getMe().then(data=>{
            
            navporofileBox.setAttribute('href','index.html')
            navporofileBox.innerHTML=
         ` <span class="main-header__profile-text"> ${data.name}</span>`
        })
      
    }else{
        navporofileBox.setAttribute("href","login.html")
        navporofileBox.innerHTML='<span class="main-header__profile-text">  ثبت نام / ورود</span>'
    }
  
}
//  Dom watch topbar
const renderTopbarMenus= async ()=>{
    const topBarList=document.querySelector('.top-bar__item')
 const res=await fetch('http://localhost:4000/v1/menus/topbar')
 const topbarMenus=await res.json()
//  console.log(topbarMenus);
 topBarList.innerHTM=' ';
 const shuffledArray=topbarMenus.sort((a,b)=>.5 - Math.random())
 shuffledArray.splice(0,6).map((menu,index)=>{
    topBarList.innerHTML+=`  <a href="#" class="top-bar__link ${index !==0? 'md:mr-0 mr-4': ' '}">${menu.title}</a>`
 })
}

const getAndShowAllcourses= async ()=>{
    const coursesContent=document.querySelector('.courses-content')
    const res=await fetch('http://localhost:4000/v1/courses')
    const courses=await res.json()
   
    courses.slice(0,6).map(course=>{
        coursesContent.insertAdjacentHTML('beforeend',
            `<div class="course-box  ">
        <div class="">
            <a href="course.html?name=${course.shortName}">
                <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="">
            </a> 
            <!----courses Body-->
            <div class="course-box__main ">
                <a href="course.html?name=${course.shortName}" class="course-box__title "> ${course.name}</a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher ">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon  "></i>
                        <a href="#" class="course-box__teacher-link"> ${course.creator}</a>
                    </div>
                    <div class="course-box__rating ">
                    ${Array(course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="">').join('')}
                    ${Array(5-course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')}

                    </div>
                </div>
                <div class="course-box__status ">
                    <div class="course-box__users ">
                        <i class="fas fa-users  course-box__teacher-icon"></i>
                        <span class="course-box__users-text "> ${course.registers}</span>
                    </div>
                    <span class="course-box__price "> ${course.price===0?"رایگان" : course.price.toLocaleString()}</span>
                </div>

            </div> 
            <!---courses Footer----->
            <div class="course-box__footer ">
                <a href="#" class="course-box__footer-link " >مشاهده اطلاعات</a>
                <i class="fas fa-arrow-left "></i>
            </div>
        </div>
    </div>`
        )
    })
    
return courses
}

const getAndShowPopularCourses=async ()=>{
const PopularcoursesWrapper=document.querySelector("#Popular_courses-wrapper")
const res=await fetch('http://localhost:4000/v1/courses/popular')
const  popularcourses=await res.json()
// console.log(popularcourses);
popularcourses.map(popular=>{
    PopularcoursesWrapper.insertAdjacentHTML('beforeend',
        ` <div class="swiper-slide"> 
            <div class="course-box shadow-lg  rounded-3xl ">
                <div class="">
    
                  <a href="course.html?name=${popular.shortName}">
                      <img class="w-full  object-cover rounded-t-3xl" src=http://localhost:4000/courses/covers/${popular.cover} alt="">
                  </a> 
                  <!----courses Body-->
                   <div class="p-4 mt-4">
                      <a href="course.html?name=${popular.shortName}" class="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300">${popular.name} </a>
                      <div class="flex items-center justify-between mt-4">
                          <div class="flex items-center text-gray-600">
                              <i class="fas fa-chalkboard-teacher text-3xl  "></i>
                              <a href="#" class="text-3xl hover:text-blue-600 transition duration-300 mr-4">${popular.creator} </a>
                          </div>
                          <div class="flex items-center child:w-5 child:h-5">
                            ${Array(popular.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="">').join('')}
                              ${Array(5-popular.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')}
                            
                          </div>
                      </div>
                      <div class="flex justify-between items-center text-gray-600 mt-6">
                          <div class="flex items-center">
                              <i class="fas fa-users  text-3xl"></i>
                              <span class="block text-3xl mr-4 ">${popular.registers}</span>
                          </div>
                          <span class="text-3xl font-bold text-green-600">${popular.price===0?"رایگان" : popular.price.toLocaleString()}</span>
                      </div>
      
                  </div> 
                  <!---courses Footer----->
                  <div class="flex  items-center justify-center gap-2 py-6 border-t border-gray-200 text-green-500 text-2xl hover:text-blue-500 transition-colors duration-300">
                      <a href="#" class="font-bold" >مشاهده اطلاعات</a>
                      <i class="fas fa-arrow-left "></i>
                  </div>
                </div>
            </div>
          </div>`
    )
})

return popularcourses
}
const getAndShowPresellcourses= async ()=>{
    const presellCoursesWrapper=document.querySelector('#presell_courses-wrapper')
    
    const res=await fetch('http://localhost:4000/v1/courses/presell')
    const presellcourses=await res.json()
    // console.log(presellcourses);

    presellcourses.map(presell=>{
        presellCoursesWrapper.insertAdjacentHTML('beforeend',
            `<div class="swiper-slide"> 
            <div class="course-box shadow-lg  rounded-3xl ">
                <div class="">
    
                  <a href="course.html?name=${presell.shortName}">
                      <img class="w-full  object-cover rounded-t-3xl" src=http://localhost:4000/courses/covers/${presell.cover} alt="">
                  </a> 
                  <!----courses Body-->
                   <div class="p-4 mt-4">
                      <a href="course.html?name=${presell.shortName}" class="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition duration-300"> ${presell.name}</a>
                      <div class="flex items-center justify-between mt-4">
                          <div class="flex items-center text-gray-600">
                              <i class="fas fa-chalkboard-teacher text-3xl  "></i>
                              <a href="#" class="text-3xl hover:text-blue-600 transition duration-300 mr-4">${presell.creator} </a>
                          </div>
                          <div class="flex items-center child:w-5 child:h-5">
                          ${Array(presell.courseAverageScore).fill(0).map((score)=>'<img src="imeges/svgs/star_fill.svg" alt="">').join('')}
                          ${Array(5-presell.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')} 
                     
                          </div>
                      </div>
                      <div class="flex justify-between items-center text-gray-600 mt-6">
                          <div class="flex items-center">
                              <i class="fas fa-users  text-3xl"></i>
                              <span class="block text-3xl mr-4 ">${presell.registers}</span>
                          </div>
                          <span class="text-3xl font-bold text-green-600">${(presell.price===0?'رایگان':presell.price).toLocaleString()}</span>
                      </div>
      
                  </div> 
                  <!---courses Footer----->
                  <div class="flex  items-center justify-center gap-2 py-6 border-t border-gray-200 text-green-500 text-2xl hover:text-blue-500 transition-colors duration-300">
                      <a href="#" class="font-bold" >مشاهده اطلاعات</a>
                      <i class="fas fa-arrow-left "></i>
                  </div>
                </div>
            </div>
          </div>`
        )
    })


}

const getAndShowArticles=async ()=>{
    
    const articleswrapper=document.querySelector('#articles-wrapper')
    
    const res=await fetch('http://localhost:4000/v1/articles')
    const articles=await res.json()
    // console.log(articles);
  
    articles.slice(0,6).forEach(blog => {
        // console.log(blog);
        
        articleswrapper.insertAdjacentHTML('beforeend',
            ` <div class="flex flex-col bg-white dark:bg-darker overflow-hidden shadow-lg rounded-3xl transform hover:-translate-y-6 duration-300">
            <!---blog Head-->
            <a href="blog.html?name=${blog.shortName}" class="block ">
                <img class="w-full md:object-cover object-fit  md:object-top  h-[260px]  rounded-mt-3xl" src="http://localhost:4000/courses/covers/${blog.cover}" alt="">
            </a>
            <!---blog body-->
            <div class="flex-grow px-5 py-6">
                <a href="blog.html?name=${blog.shortName}" class="line-clamp-2 font-bold"> ${blog.title}</a>
                <p class="mt-3.5 lg:mt-5 text-2xl text-gray-500 dark:text-gray-400 line-clamp-2">${blog.description}</p>
                <a href="blog.html?name=${blog.shortName}" class="inline-block text-3xl text-green-500 border border-green-500 hover:bg-green-500 hover:text-white  px-5 py-2  rounded-md my-6 transition duration-300n">بیشتر بخوانید</a>
            </div>
            
        </div>`
        )
        
    });
   
    
}

const getAndShowNavbarMenus=async ()=>{
    const menusWrapper=document.querySelector('#menus-wrapper')
    // console.log(menusWrapper);
    
    const res=await fetch('http://localhost:4000/v1/menus')
    const menus=await res.json()
    // console.log(menus);

    menus.map((menu)=>{
    // console.log('mmmmmmmmm',menu);
    
        
        menusWrapper.insertAdjacentHTML('beforeend',
            `<li class="relative group">
                <a href=category.html?cat=${menu.href}&page=1 class="main-header__link "> ${menu.title}  
                   ${
                    menu.submenus.length>0 
                   ?`<i class="fas fa-angle-down main-header__link-icon group-hover:rotate-180"></i>`:''
                }
                </a>
                 ${
                    menu.submenus.length > 0
                        ? `<div class="main-header__dropdown-item">
                            ${menu.submenus.map((submenu) =>
                                `<a href="course.html?name=${submenu.href.split('/').pop()}" class="main-header__dropdown-link">${submenu.title}</a>`
                                ).join('')}
                            </div>`
                        : ''
                    }
            </li>`
        )
    })
    


}
const getAndShowNavbarMenusMobile=async ()=>{
    const menusWrapper=document.querySelector('#menus-wrapper-navbar-mobile')
   
  
    // console.log(menusWrapper);
    
    const res=await fetch('http://localhost:4000/v1/menus')
    const menus=await res.json()
    // console.log(menus);

    menus.forEach((menu)=>{
    // console.log('mmmmmmmmm',menu);
    
        
        menusWrapper.insertAdjacentHTML('beforeend',
            `<li class=" flex flex-col items-center">
               <div class="flex items-center justify-between w-full space-y-4 ">
                     <a href=category.html?cat=${menu.href}&page=1 class="flex items-center gap-x-2 space-y-4 "> ${menu.title}  
                   
                    </a>
                    ${
                    menu.submenus.length>0 
                   ?`
                   <span class="submenu-open-btn" id="main_header_icon-botto_svg">
                        <i class="fas fa-angle-down main-header__link-icon-navbar cursor-pointer " ></i>
                   </span>`:''
                    }              
               </div>
                 ${
                    menu.submenus.length > 0
                    ? `<div class="submenu ">
                            ${menu.submenus.map((submenu) =>
                                `<a href="course.html?name=${submenu.href.split('/').pop()}" class="main-header__dropdown-link">${submenu.title}</a>`
                                ).join('')}
                        </div>`                         
                        : ''
                    }
            </li>`
        )
    })
   
    
    showAndHiddeSidebar()

}

const showAndHiddeSidebar=()=>{
 // انتخاب تمام دکمه‌های باز و بسته کردن زیرمنو
 const submenuOpenBtns = document.querySelectorAll('.submenu-open-btn');
//  console.log(submenuOpenBtns); // بررسی برای اطمینان از درست بودن انتخاب‌ها

 submenuOpenBtns.forEach((btn) => {
     btn.addEventListener('click', (event) => {
         const submenu = event.target.closest('li').querySelector('.submenu');
         if (submenu) {
             if (submenu.classList.contains('hidden')) {
                 submenu.classList.remove('hidden');
                 submenu.classList.add('submenu_open'); // نمایش زیرمنو
             } else {
                 submenu.classList.add('hidden');
                 submenu.classList.remove('submenu_open'); // مخفی کردن زیرمنو
             }
         }
     });
 });


}

const  showCloseNavbar=()=>{
    // const navOpenBtn=document.querySelector('.nav-icon')
    const navCloseBtn=document.querySelector('.nav-Close-Btn')
    const nav=document.querySelector('.nav') 
    const overlay=document.querySelector('.overlay')

    navCloseBtn.addEventListener('click',()=>{
        nav.classList.remove("right-0")
        nav.classList.add("-right-80")
        overlay.classList.remove("overlay_visible")
    })

  
}
const  showOpenNavbar=()=>{
    const navOpenBtn=document.querySelector('.nav-icon')
    const overlay=document.querySelector('.overlay')
    const nav=document.querySelector('.nav') 

    navOpenBtn.addEventListener('click',()=>{
        nav.classList.remove("-right-80")
        nav.classList.add("right-0")
        overlay.classList.add("overlay_visible")
   
        })
}
const  showUserProfileNavbarMobile=()=>{
    const navporofileBox=document.querySelector('#main-header__profile-id-mobile')
    // console.log('navporofileBox',navporofileBox);
    
    const isUserLogin=isLogin()
    if (isUserLogin) {
        // debugger;
        const userInfos=getMe().then(data=>{
            
            navporofileBox.setAttribute('href','index.html')
            navporofileBox.innerHTML=
         ` <span class="main-header__profile-text-mobile"> ${data.name}</span>`
        })
      
    }else{
        navporofileBox.setAttribute("href","login.html")
        navporofileBox.innerHTML='<span class="main-header__profile-text-mobile">  ثبت نام / ورود</span>'
    }
  
}
const  showUserProfileSidebarMobile=()=>{
    const navporofileBox=document.querySelector('#main-header__profile-sidebar-mobile')
    // console.log('navporofileBox',navporofileBox);
    
    const isUserLogin=isLogin()
    if (isUserLogin) {
        // debugger;
        const userInfos=getMe().then(data=>{
            
            navporofileBox.setAttribute('href','index.html')
            navporofileBox.innerHTML=
         ` <span class="main-header__profile-sidebar"> ${data.name}</span>`
        })
      
    }else{
        navporofileBox.setAttribute("href","login.html")
        navporofileBox.innerHTML='<span class="main-header__profile-sidebar">  ثبت نام / ورود</span>'
    }
  
}


const getAndShowCategoryCourses=async ()=>{
    const categoryName =getUrlparam('cat')
//   console.log(categoryName);
  
    
    
    const cleanCategoryName = categoryName.split('/').pop();
    // console.log('Clean Category Name:', cleanCategoryName);
   
    const token =  JSON.parse(localStorage.getItem('user'));
    const res = await fetch(`http://localhost:4000/v1/courses/category/${cleanCategoryName}`);
    const courses=await res.json()
    // console.log('Courses:', courses)
  
    return courses
}

const insertCourseBoxHtmlTemplate = (courses, showType='row', categoryCoursesWrapper,categoryCoursesWrapperRow) => {
    
    // console.log(categoryCoursesWrapperRow);

 
  


    categoryCoursesWrapperRow.innerHTML = "";
    categoryCoursesWrapper.innerHTML = "";
    
    if (showType === "row") {
      courses.forEach((course) => {
        categoryCoursesWrapper.insertAdjacentHTML(
          "beforeend",
          ` <div class="course-box  ">
          <div class="">
            <a href="#">
                <img class="course-box__img" src="http://localhost:4000/courses/covers/${course.cover}" alt="">
            </a> 
            <!----courses Body-->
             <div class="course-box__main ">
                <a href="#" class="course-box__title "> ${course.name} </a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher ">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon  "></i>
                        <a href="#" class="course-box__teacher-link">${course.creator} </a>
                    </div>
                    <div class="course-box__rating ">
                     ${Array(course.courseAverageScore).fill(0).map((score)=>'<img src="imeges/svgs/star_fill.svg" alt="">').join('')}
                         ${Array(5-course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')} 
                    </div>
                </div>
                <div class="course-box__status ">
                    <div class="course-box__users ">
                        <i class="fas fa-users  course-box__teacher-icon"></i>
                        <span class="course-box__users-text ">${course.registers}</span>
                    </div>
                    <span class="course-box__price ">${(course.price===0?'رایگان' : course.price).toLocaleString()}</span>
                </div>

            </div> 
            <!---courses Footer----->
            <div class="course-box__footer ">
                <a href="#" class="course-box__footer-link " >مشاهده اطلاعات</a>
                <i class="fas fa-arrow-left "></i>
            </div>
          </div>
      </div>`
        );
      });
    } else {
     
      courses.forEach((course) => {
        categoryCoursesWrapperRow.insertAdjacentHTML(
          "beforeend",
          `
        <div class="row course-box-row">
            <div class="course-box-div-row  "> 
              
                <a href="#" class="flex-shrink-0">
                    <img class="course-box__img-row" src="http://localhost:4000/courses/covers/${course.cover}" alt="">
                </a>
                
                <div class="course-box__main-row "> 
                    <a href="#" class="course-box__title  ">${course.name}  </a>
                    <div class="course-box__rating-teacher">
                        <div class="course-box__teacher">
                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" class="course-box__teacher-link">${course.creator} </a>
                        </div>
                        <div class="course-box__rating">
                          ${Array(course.courseAverageScore).fill(0).map((score)=>'<img src="imeges/svgs/star_fill.svg" alt="">').join('')}
                         ${Array(5-course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')} 
                        </div>
                    </div>
                    <div class="course-box__rating-content ">
                        <p>${course.description}</p>
                    </div>
                    <div class="course-box__status">
                        <div class="course-box__users">
                            <i class="fas fa-users course-box__teacher-icon"></i>
                            <span class="course-box__users-text">${course.registers}</span>
                        </div>
                        <span class="course-box__price">${(course.price===0?'رایگان' : course.price).toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
        `
        );
      });
    }
  };

  const coursesSorting=(array,filterMethod)=>{
    // console.log(array);
    // console.log(filterMethod);
    
    
    let outputArray=[]
    switch(filterMethod){
        case 'free':{
            outputArray=array.filter(course=>course.price===0)
            break
        }
        case 'money':{
             outputArray = array.filter(course => course.price !== 0);
            break
        }
        case 'first':{
            outputArray = [...array].reverse()
           break
       }
       case 'last':{
        outputArray = array
       break
   }
        case 'default':{
            outputArray=array
            break
        }
        default:{
            outputArray=array
            
        }
    }
    return outputArray
    
  }

  const getCourseDetails=()=>{
  const courseShortName= getUrlparam("name");
  
//   console.log(courseShortName);
  
  //select Elems From DOM
  const $ = document;
  const courseTitleElem = $.querySelector(".course-info__title");
  const courseDescElem = $.querySelector(".course-info__text");
  const courseCategoryElem = $.querySelector(".course-info__link");
//   console.log('4444444444444444444',courseCategoryElem);
  
  const courseRegisterInfoElem = $.querySelector(".course-info__register-title");
  const courseStatusElem = $.querySelector(".course-boxes__box-left--subtitle");
  const courseSupportElem = $.querySelector(".course-boxes__box-left--suppot");
  const courseLastUpdateElem = $.querySelector(".course-boxes__box-left--last-update");
  const courseTimeSessionsElem = $.querySelector(".course-boxes__box-left--subtitle-time");
   const courseCommentElem = $.querySelector(".course-info-total-comment-text");
   const courseTotalStudentElem = $.querySelector(".course-info-total-students");
   const courseCommentsCountElem = $.querySelector(".course-info__total-comment-text");
  const courseStudentsCountElem = $.querySelector(".course-info__total-sale-number");
  const commentsContentWrapper = $.querySelector(".comments__content");
  const couesesVideo=$.querySelector('#course-content-video')

   fetch(`http://localhost:4000/v1/courses/${courseShortName}`
   // ,{
//     method:"POST",
//     headers:{
//         Authorization:`Bearer ${getToken()}`,

//     },
//    }
)
   .then((res)=>res.json())
   .then((course)=>{
    couesesVideo.setAttribute('poster',`http://localhost:4000/courses/covers/${course.cover}`)
    // console.log('333333333333333',couesesVideo);
    // console.log('2222222222',course);
    courseTitleElem.innerHTML=course.name
    courseDescElem.innerHTML=course.description
    // console.log(course.categoryID);
    
    courseCategoryElem.innerHTML=course.categoryID.title
    // course.sessions.forEach(course=>{
    //     console.log('2333333333333',course.video);
    //     couesesVideo.setAttribute('src',`http://localhost:4000/courses/covers/${course.video}`)
    // })
    courseRegisterInfoElem .insertAdjacentHTML('beforeend',
    course.isUserRegisteredToThisCourse ? " دانشجوی دوره هستید" : "ثبت نام در دوره" )
    courseStatusElem .innerHTML = course.isComplete ? "تکمیل شده" : "در حال برگزاری"
    courseSupportElem .innerHTML = course.support 
    courseLastUpdateElem .innerHTML = course.createdAt.slice(0,10)
    // courseTimeSessionsElem.forEach(())=
    let courseSessions=course.sessions
    let sum=0
    courseSessions.map(item => {
        let sessionTime = item.time
        // // تبدیل "MM:SS" به مجموع ثانیه
   let [minutes, seconds] = sessionTime.split(":").map(Number); // تبدیل به عدد
   let sessionSeconds = (minutes * 60) + seconds; // محاسبه کل ثانیه
   sum += sessionSeconds; // جمع کل زمان جلسات
   let totalHours = Math.floor(sum / 3600); // محاسبه تعداد ساعت
   courseTimeSessionsElem.innerHTML=totalHours+' ساعت'
    });
    courseCommentElem.innerHTML=`${course.comments.length} دیدگاه `
    courseTotalStudentElem.innerHTML=course.courseStudentsCount
    // show course Sessions
    const sessionsWrapper =$.querySelector('.sessions-wrapper ')
    if (course.sessions.length) {
        course.sessions.slice(0,3).forEach((session,index)=>{
           
            
           
            sessionsWrapper.insertAdjacentHTML('beforeend',`
                <div class="accordion-body flex items-center justify-between p-5 border border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <!---accordion right-->
                    <div class="flex items-center gap-6">
                        <span class=" flex items-center justify-center border w-14 h-14 text-3xl text-[#656464] pt-3  border-gray-200 rounded-full">${index+1}</span>
                        <i class="fab fa-youtube text-3xl text-[#939aa3]"></i>
                        ${
                            (session.free||session.isUserRegisteredToThisCourse) ?
                             ` 
                             <a href="episode.html?name=${course.shortName}&id=${session._id}" class="text-gray-700 hover:text-blue-600 transition duration-300">
                             ${session.title}
                            </a>` :
                            `<span class="text-gray-700 ">
                            ${session.title}
                          </span>`
                        }
                    
                    </div>
                    <!---accordion left-->
                    <div>
                        <span class="text-gray-700">${session.time}</span>
                         
                               ${
                            !(session.free||session.isUserRegisteredToThisCourse) ?
                             ` 
                            <i class="fa fa-lock"></i>
                            ` :
                            ``
                        }
                           
                        
                    </div>
                </div>
                `)
    
        })
        
    }else{
        
            sessionsWrapper.insertAdjacentHTML('beforeend',`
                <div class="accordion-body flex items-center justify-between p-5 border border-b-4 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <!---accordion right-->
                    <div class="flex items-center gap-6">
                        <span class=" flex items-center justify-center border w-14 h-14 text-3xl text-[#656464] pt-3  border-gray-200 rounded-full">--</span>
                        <i class="fab fa-youtube text-3xl text-[#939aa3]"></i>
                        <a href="#" class="text-gray-700 hover:text-blue-600 transition duration-300">
                         هنوز جلسه ای آپلود نشده است
                        </a>
                    </div>
                    <!---accordion left-->
                    <div>
                        <span class="text-gray-700">00:00</span>
                    </div>
                </div>
                `) 
     
    } 
       // show course comment
   if(course.comments.length){
    course.comments.forEach(commet=>{
        // console.log(commet);
        commentsContentWrapper.insertAdjacentHTML('beforeend',`
          <div class="comments__item bg-[#f0f2f7] rounded-2xl border border-gray-200 p-6 md:p-12 mb-12">
                        <div class="comments__question">
                            <div class="comments__question-header flex justify-between">
                                <div class="comments__question-header-right flex flex-wrap leading-normal items-start md:items-center">
                                     <span class="comments__question-name comment-name text-2xl font-bold text-gray-800 "> ${commet.creator.name}</span>
                                    <span class="comments__question-status comment-status flex items-center bg-green-500 text-white text-xl md:text-2xl font-bold py-1 px-2 md:py-1.5 md:px-3 rounded-lg mx-3">(${commet.creator.role==='USER'?"دانشجو":"مدرس"})</span>
                                    <span class="comments__question-date comment-date text-2xl text-gray-500">${commet.creator.updatedAt.slice(0,10)}</span>
                                </div>
                                <div class="comments__question-header-left">
                                    <a class="comments__question-header-link comment-link text-2xl text-gray-500 border border-gray-300 py-1 px-2 md:py-1.5 md:px-3 rounded-md bg-white  " href="#">پاسخ</a>
                                </div>
                            </div>
                            <div class="comments__question-text mt-4 space-y-2">
                                <p class="comments__question-paragraph comment-paragraph text-2xl leading-normal text-gray-800">${commet.body}
                                </p>
                                
                            </div>
                        </div>
                        ${commet.answerContent?`
                           <div class="comments__ansewr border border-gray-300 rounded-2xl p-6 md:p-12 mt-4">
                            <div class="comments__ansewr-header flex justify-between">
                                <div class="comments__ansewr-header-right flex flex-wrap leading-normal items-start md:items-center">
                                    <span class="comments__ansewr-name comment-name text-2xl font-bold text-gray-800 ">${commet.answerContent.creator.name}
                                        </span>
                                    <span class="comments__ansewr-staus comment-status bg-blue-500 text-white text-xl md:text-2xl font-bold py-1 px-2 md:py-1.5 md:px-3 rounded-lg mx-3">( ${commet.creator.role==='USER'?"دانشجو":"مدرس"} )</span>
                                    <span class="comments__ansewr-date comment-date text-2xl text-gray-500">${commet.answerContent.creator.updatedAt.slice(0,10)}</span>
                                </div>
                                <div class="comments__ansewr-header-left">
                                    <a class="comments__ansewr-header-link comment-link text-2xl text-gray-500 border border-gray-300 py-1 px-2 md:py-1.5 md:px-3 rounded-md bg-white" href="#">پاسخ</a>
                                </div>
                            </div>
                            <div class="comments__ansewr-text space-y-1">
                                <p class="comments__ansewr-paragraph my-4 comment-paragraph text-2xl leading-normal text-gray-800">  ${commet.answerContent.body} </p>
                              
                            </div>
                        </div> 
                            `:``}
                        
                    </div>  
        `)
    })
   }else{
    commentsContentWrapper.insertAdjacentHTML('beforeend',`
        <div class=" w-full h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" > هنوز هیچ کامنتی برای این ثبت نشده است</div>
        `)
   }

   })
  

}
const getAndShowRelatedcourses=async ()=>{
    // console.log(getUrlparam("name"));
    
    const courseShortName= getUrlparam("name");
// console.log(courseShortName);

// const cleanCategoryName = categoryName.split('/').pop();
// console.log('Clean Category Name:', cleanCategoryName);

    const courseRelatedCoursesWrapper=document.querySelector('.course-info-course-list')
const res= await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
// console.log(res);

const relatedCourses=await res.json()

if (relatedCourses.length) {
    relatedCourses.forEach(course=>{
        // console.log(course);
        
        courseRelatedCoursesWrapper.insertAdjacentHTML('beforeend',`
            <li class="course-info-courses-item ">
                <a href="course.html?name=${course.shortName}" class="course-info-courses-link">
                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="course cover" class="course-info-courses-img ">
                    <span class=" course-info-courses-text">${course.name}</span>
                </a>
            </li>
            `)
    })
}else{

}



return relatedCourses
}
const getSessionDetails=async ()=>{
    const coursesessionListElem=document.querySelector('.sidebar-topic-list')
    const sessionvideoElem=document.querySelector('.episode-content-video')
    // console.log(sessionvideoElem);
    
    const sessioShortName=getUrlparam("name")
    // console.log(sessioShortName);
    
    const SessionID=getUrlparam('id')
    // console.log(SessionID);
    const res=await fetch(`http://localhost:4000/v1/courses/${sessioShortName}/${SessionID}`,{
        headers:{
            Authorization :`Bearer ${getToken()}`
        }
    })
    const responseData=await res.json()
    // console.log(responseData);
   
    
    sessionvideoElem.setAttribute('src',`http://localhost:4000/courses/covers/${responseData.session.video}`)
    // console.log('999999999999999',responseData);
    
    responseData.sessions.slice(0,4).forEach(session=>{
        // console.log('455666666660',session);
        
        coursesessionListElem.insertAdjacentHTML('beforeend',`
            <li class="flex justify-between items-center border-t py-6">
                  <div class="flex items-center gap-x-4">
                    <i class="fas fa-play-circle text-gray-500 mr-2"></i>
                    ${
                        session.free?`
                        <a href="episode.html?name${sessioShortName}&id=${session._id}" class="session-products text-gray-700">${session.title} </a>` :`
                        <span  class="session-products text-gray-700">${session.title} </span>`
                    }
                    
                  </div>
                  <div>
                  <span class=" text-gray-600">${session.time}</span>
                          ${
                            !(session.free||session.isUserRegisteredToThisCourse) ?
                             ` 
                            <i class="fa fa-lock"></i>
                            ` :
                            ``
                        }
                  </div>

                </li>
            `)
    })
  

    return responseData
}
const submitContactUsMsg=async ()=>{
  const nameInputElem=document.querySelector('#name')  
  const emailInputElem=document.querySelector('#email')               
  const phoneInputElem=document.querySelector('#phone') 
  const bodyInputElem=document.querySelector('#body')   

  const newContactUsInfos={
    name:nameInputElem.value.trim(),
    email:emailInputElem.value.trim(),
    phone:phoneInputElem.value.trim(),
    body:bodyInputElem.value.trim()
  }
  const res=await fetch('http://localhost:4000/v1/contact',{
    method:"POST",
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(newContactUsInfos)
  })
  const result=await res.json()
  if (res.status === 201) {
    showSwal("پیغام شما با موفقیت ارسال شد", "success", " ورود به پنل", (result) => {
        // console.log(result);
        
        location.href = "index.html"

      })

  } else {
    showSwal("لطفا بعدا تست کنید /n مشکلی در ارسال پیغام وجود دارد", "error", "متاسفم ")
  }
//   console.log(res);
//   console.log(result);
 
  
}
const createNewNewsLettes=async ()=>{
    const newsLetterInput=document.querySelector('#news-letter-input')
    const newNewsLetterEmailObj={
        email:newsLetterInput.value.trim()
    }
    const res=await fetch('http://localhost:4000/v1/newsletters',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newNewsLetterEmailObj)
      })
      const result=await res.json()
      if (res.ok) {
        showSwal(" با موفقیت در خبرنامه سبزلرن عضو شدید ", "success", "  متوجه شدم ", () => {
            location.href = "index.html"
          })
      } 
}
const globalSearch=async ()=>{
 const searchValue=getUrlparam('value')
 const coursesSearchResult=document.querySelector('.courses-content')   
 const articleSearchResult=document.querySelector('#articles-wrapper')
const res=await fetch(`http://localhost:4000/v1/search/${searchValue}`)
 const data = await res.json()
 if (data.allResultCourses.length) {
    data.allResultCourses.forEach(course=>{
        coursesSearchResult.insertAdjacentHTML('beforeend',`
            <div class="course-box  ">
            <div class="">
                <a href="course.html?name=${course.shortName}">
                    <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="">
                </a> 
                <!----courses Body-->
                <div class="course-box__main ">
                    <a href="course.html?name=${course.shortName}" class="course-box__title "> ${course.name}</a>
                    <div class="course-box__rating-teacher">
                        <div class="course-box__teacher ">
                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon  "></i>
                            <a href="#" class="course-box__teacher-link"> محمد امین سعیدی راد</a>
                        </div>
                        <div class="course-box__rating ">
                        <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="star">
                        <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="star">
                        <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="star">
                        <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="star">
                        <img class="course-box__star" src="imeges/svgs/star.svg" alt="star">
    
    
                        </div>
                    </div>
                    <div class="course-box__status ">
                        <div class="course-box__users ">
                            <i class="fas fa-users  course-box__teacher-icon"></i>
                            <span class="course-box__users-text "> ${course.registers}</span>
                        </div>
                        <span class="course-box__price "> ${course.price===0?"رایگان" : course.price.toLocaleString()}</span>
                    </div>
    
                </div> 
                <!---courses Footer----->
                <div class="course-box__footer ">
                    <a href="#" class="course-box__footer-link " >مشاهده اطلاعات</a>
                    <i class="fas fa-arrow-left "></i>
                </div>
            </div>
        </div>
        `)
     })
 }else{
    coursesSearchResult.insertAdjacentHTML('beforeend',`
                <div class=" col-start-1 col-end-4 h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" >هیچ دوره ای برای جستجوی شما وجود ندارد </div>

        `)
 }

 if (data.allResultArticles.length) {
    data.allResultArticles.forEach(blog => {
        articleSearchResult.insertAdjacentHTML('beforeend',
            ` 
        <div class="flex flex-col bg-white dark:bg-darker overflow-hidden shadow-lg rounded-3xl transform hover:-translate-y-6 duration-300">
            <!---blog Head-->
            <a href="blog.html?name=${blog.shortName}" class="block ">
                <img class="w-full md:object-cover object-fit  md:object-top  h-[260px]  rounded-mt-3xl" src="http://localhost:4000/courses/covers/${blog.cover}" alt="">
            </a>
            <!---blog body-->
            <div class="flex-grow px-5 py-6">
                <a href="blog.html?name=${blog.shortName}" class="line-clamp-2 font-bold"> ${blog.title}</a>
                <p class="mt-3.5 lg:mt-5 text-2xl text-gray-500 dark:text-gray-400 line-clamp-2">${blog.description}</p>
                <a href="blog.html?name=${blog.shortName}" class="inline-block text-3xl text-green-500 border border-green-500 hover:bg-green-500 hover:text-white  px-5 py-2  rounded-md my-6 transition duration-300n">بیشتر بخوانید</a>
            </div>
            
        </div>
        
        `
        )
    });
 }else{
    articleSearchResult.insertAdjacentHTML('beforeend',`
                <div class=" col-start-1 col-end-4  w-full h-20 mb-8 bg-red-400 flex items-center justify-center rounded-lg" >هیچ  مقاله ای برای جستجوی شما وجود ندارد </div>

        `)
 }
 


 return data
}

const submitComment=async () =>{
    const commentTextareaElem=document.querySelector('.comments__score-input-respond')
    const commentScoreElem=document.querySelector('#comment-score')
    let score=5
    let courseShortName=getUrlparam('name')
    commentScoreElem.addEventListener('change',event=>score=event.target.value)
    
    const newCommentInfos={
        body:commentTextareaElem.value.trim(),
        courseShortName,
        score:commentScoreElem.value
    }
    // console.log();
    // console.log(newCommentInfos);
 
    const res=await fetch('http://localhost:4000/v1/comments',{
        method:"POST",
        headers:{
            Authorization : `Bearer ${getToken()}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newCommentInfos)
      })
        
// console.log(res);
if (res.ok) {
    showSwal('کامنت مورد نظر شما با موفقیت ثبت شد','success','خیلی هم عالی',()=>{})
}

}

const getAllCouses=async ()=>{
const coursesContainerElem=document.querySelector('#courses-wrapper')
// console.log(coursesContainerElem);


const res=await fetch('http://localhost:4000/v1/courses')
const courses =await res.json()
courses.forEach(course=>{
    coursesContainerElem.insertAdjacentHTML('beforeend',`
       <div class="course-box  ">
        <div class="">
            <a href="course.html?name=${course.shortName}">
                <img class="course-box__img" src=http://localhost:4000/courses/covers/${course.cover} alt="">
            </a> 
            <!----courses Body-->
            <div class="course-box__main ">
                <a href="course.html?name=${course.shortName}" class="course-box__title "> ${course.name}</a>
                <div class="course-box__rating-teacher">
                    <div class="course-box__teacher ">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon  "></i>
                        <a href="#" class="course-box__teacher-link"> ${course.creator}</a>
                    </div>
                    <div class="course-box__rating ">
                    ${Array(course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star_fill.svg" alt="">').join('')}
                    ${Array(5-course.courseAverageScore).fill(0).map((score)=>' <img class="course-box__star" src="imeges/svgs/star.svg" alt="">').join('')}


                    </div>
                </div>
                <div class="course-box__status ">
                    <div class="course-box__users ">
                        <i class="fas fa-users  course-box__teacher-icon"></i>
                        <span class="course-box__users-text "> ${course.registers}</span>
                    </div>
                    <span class="course-box__price "> ${course.price===0?"رایگان" : course.price.toLocaleString()}</span>
                </div>

            </div> 
            <!---courses Footer----->
            <div class="course-box__footer ">
                <a href="#" class="course-box__footer-link " >مشاهده اطلاعات</a>
                <i class="fas fa-arrow-left "></i>
            </div>
        </div>
    </div> 
    `)
})

return courses
}

        // Blog.html 
const getAllArticles=async ()=>{
    const articleTitle=document.querySelector('#article__title')
    // const articleHeaderTitle=document.querySelector('#article__header-title')
    const articleHeaderUser=document.querySelector('#article__header-user')
    const articleHeaderData=document.querySelector('#article__header-data')
    const articleHeaderView=document.querySelector('#article__header-view')
    const articleSectionTitel=document.querySelector('#article-section-Titel')
    const articleSectionContentBody=document.querySelectorAll('#article-section-content-body')
    const articleReadtitle=document.querySelectorAll('#article-read-title')
    // console.log(articleReadtitle);
    
    let ArticleShortName=getUrlparam('name')
    const res=await fetch(`http://localhost:4000/v1/articles/${ArticleShortName}`)
    const data=await res.json()
    // console.log('1010101010',data);
    

    articleTitle.innerHTML=data.title
    articleHeaderUser.innerHTML=`ارسال شده توسط ${data.creator.name}`
    articleHeaderData.innerHTML=data.updatedAt.slice(0,10)
    articleHeaderView.innerHTML=data.publish
    articleSectionTitel.innerHTML=data.description
    articleSectionContentBody.forEach(content=>{
        content.innerHTML=data.body
    })
    articleReadtitle.forEach(title=>{
        title.innerHTML=data.title
        
    })
}
const getAndShowArticleNew=async()=>{
    const courseInfoBlog=document.querySelector('#course-info-Blog')
    const res=await fetch('http://localhost:4000/v1/articles')
    const articles=await res.json()
    // console.log(articles);

    articles.slice(0,6).forEach(blog => {
        // console.log(blog);
        courseInfoBlog.insertAdjacentHTML('beforeend',`
            <li class="flex items-center gap-5 mt-3  border-b group border-gray-100 py-4 pl-4 ">
                <a href="blog.html?name=${blog.shortName}" class="group-hover:text-blue-600 transition duration-300 ">
                ${blog.title}
            </li>
    `)
        
    })
}
const getAndShowFastAccess=async()=>{
    const courseInfoBlogFast=document.querySelector('#course-info-blog-fast')
    
    const res=await fetch('http://localhost:4000/v1/menus')
    const menus=await res.json()
    // console.log(menus);

    menus.slice(0,5).map((menu)=>{
    // console.log('mmmmmmmmm',menu);   
    courseInfoBlogFast.insertAdjacentHTML('beforeend',`
          <li class="flex items-center gap-5 mt-3  border-b group border-gray-100 py-1 pl-4 hover:bg-slate-50 hover:pr-6 transition duration-400">
                <i class="fas fa-angle-left text-gray-600 group-hover:text-green-500"></i>
                <a href="category.html?cat=${menu.href}&page=1" class="group-hover:text-blue-600 transition duration-300 ">
               ${menu.title}
            </li>
        
        `)
})
}
// const getAndShowRelatedArticle=async ()=>{
//     console.log(getUrlparam("name"));
    
//     const courseShortName= getUrlparam("name");
// console.log(courseShortName);

//     const courseRelatedCoursesWrapper=document.querySelector('.course-info-related-list')
// const res= await fetch(`http://localhost:4000/v1/courses/related/${courseShortName}`)
// console.log(res);

// const relatedCourses=await res.json()

// if (relatedCourses.length) {
//     relatedCourses.forEach(course=>{
//         console.log(course);
        
//         courseRelatedCoursesWrapper.insertAdjacentHTML('beforeend',`

//              <li class="course-info-courses-item ">
//                 <a href="course.html?name=${course.shortName}" class=" course-info-courses-link">
//                     <img src="http://localhost:4000/courses/covers/${course.cover}" alt="course cover" class="course-info-courses-img ">
//                     <span class=" course-info-courses-text">${course.name}</span>
//                 </a>
//             </li>


//             // <li class="course-info-courses-item ">
//             //     <a href="course.html?name=${course.shortName}" class="course-info-courses-link">
//             //         <img src=http://localhost:4000/courses/covers/${course.cover} alt="course cover" class="course-info-courses-img ">
//             //         <span class=" course-info-courses-text">${course.name}</span>
//             //     </a>
//             // </li>
//             `)
//     })
// }else{

// }



// return relatedCourses
// }
const submitCommentArticle=async () =>{
    const commentTextareaElem=document.querySelector('.comments__score-input-respond-article')
    const commentScoreElem=document.querySelector('#comment-score-article')
    let score=5
    let courseShortName=getUrlparam('name')
    commentScoreElem.addEventListener('change',event=>score=event.target.value)
    
    const newCommentInfos={
        body:commentTextareaElem.value.trim(),
        courseShortName,
        score:commentScoreElem.value
    }
    // console.log();
    // console.log(newCommentInfos);
 
    const res=await fetch('http://localhost:4000/v1/comments',{
        method:"POST",
        headers:{
            Authorization : `Bearer ${getToken()}`,
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newCommentInfos)
      })
        
// console.log(res);
if (res.ok) {
    showSwal('کامنت مورد نظر شما با موفقیت ثبت شد','success','خیلی هم عالی',()=>{})
}

}

const getAndShowAllArticles=async ()=>{
    
    const articleswrapper=document.querySelector('#articles-wrapper-article')
    
    const res=await fetch('http://localhost:4000/v1/articles')
    const articles=await res.json()
    // console.log(articles);
  
    articles.forEach(blog => {
        // console.log(blog);
        
        articleswrapper.insertAdjacentHTML('beforeend',
            ` <div class="flex flex-col bg-white dark:bg-darker overflow-hidden shadow-lg rounded-3xl transform hover:-translate-y-6 duration-300">
            <!---blog Head-->
            <a href="blog.html?name=${blog.shortName}" class="block ">
                <img class="w-full md:object-cover object-fit  md:object-top  h-[260px]  rounded-mt-3xl" src="http://localhost:4000/courses/covers/${blog.cover}" alt="">
            </a>
            <!---blog body-->
            <div class="flex-grow px-5 py-6">
                <a href="blog.html?name=${blog.shortName}" class="line-clamp-2 font-bold"> ${blog.title}</a>
                <p class="mt-3.5 lg:mt-5 text-2xl text-gray-500 dark:text-gray-400 line-clamp-2">${blog.description}</p>
                <a href="blog.html?name=${blog.shortName}" class="inline-block text-3xl text-green-500 border border-green-500 hover:bg-green-500 hover:text-white  px-5 py-2  rounded-md my-6 transition duration-300n">بیشتر بخوانید</a>
            </div>
            
        </div>`
        )
        
    });
   
    
}

export {
    showUserNameInVavbar,
    renderTopbarMenus,
    getAndShowAllcourses,
    getAndShowPopularCourses,
    getAndShowPresellcourses,
    getAndShowArticles,
    getAndShowNavbarMenus,
    getAndShowCategoryCourses,
    insertCourseBoxHtmlTemplate,
    coursesSorting,getCourseDetails,
    getAndShowRelatedcourses,
    getSessionDetails,
    submitContactUsMsg,
    createNewNewsLettes,
    globalSearch,
    submitComment,
    getAllCouses,
    getAllArticles,
    getAndShowArticleNew,
    getAndShowFastAccess,
    submitCommentArticle,
    getAndShowAllArticles,
    getAndShowNavbarMenusMobile,
    showAndHiddeSidebar,
    showCloseNavbar,
    showOpenNavbar,
    showUserProfileNavbarMobile,
    showUserProfileSidebarMobile,

    
    // getAndShowRelatedArticle
}