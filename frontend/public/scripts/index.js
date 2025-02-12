import {
     getAndShowAllcourses,
     getAndShowPopularCourses,
     getAndShowPresellcourses,
     getAndShowArticles,
     globalSearch,
     getAndShowNavbarMenusMobile,
     showAndHiddeSidebar,
     showCloseNavbar,
    showOpenNavbar,
    showUserProfileNavbarMobile,
    showUserProfileSidebarMobile,
    } from "./funcs/shaed.js"

const $=document
const landingTitle=$.querySelector('#landing-title')
const landingStatusCount=$.querySelector('#landing-status-count')
const userCounter=$.querySelector('#user-counter')
const minutesCounter=$.querySelector('#minutes-counter')
const globalSearchBtn=document.querySelector('#search-btn')
const globalSearchInput=document.querySelector('#search-input')
// console.log(globalSearchInput);
// console.log(globalSearchBtn);



//  start  It displays the text automatically
window.addEventListener("load",()=>{
    let landingText= ' ما به هر قیمتی دوره آموزشی تولید نمی کنیم!';
    let typeIndex=0;
    typeWriter(landingText,typeIndex)
    makeCounter(40,landingStatusCount);
    makeCounter(2_320,minutesCounter);
    makeCounter(1_071,userCounter);

    // getAndShowAllcourses().then(data=>{
    //     console.log(data);
        
    // })
    getAndShowAllcourses()
    getAndShowPopularCourses() 
    getAndShowPresellcourses()
    getAndShowArticles()  
    getAndShowNavbarMenusMobile()
    showAndHiddeSidebar()
    showCloseNavbar()
    showOpenNavbar()
    showUserProfileNavbarMobile()
    showUserProfileNavbarMobile()
    showUserProfileSidebarMobile()
    // getAndShowNavbarMenus().then(data=>{
    //     console.log(data);   
    // }) 
})
    // Handling global search
    globalSearchBtn.addEventListener('click',()=>{
        location.href=`search.html?value=${globalSearchInput.value.trim()}`
        globalSearch() 
     })

    


function typeWriter(text,index) {
    if (index<text.length) {
        landingTitle.innerHTML+=text[index];
        index++;
        // console.log(typeWriter);
    }
    setTimeout(() => {
        typeWriter(text,index);
    }, 100);
}
// To automatically add numbers in the header
function makeCounter(max,elem) {
    let counter=0
    const interval=setInterval(() => {
        if (counter===max) {
          clearInterval(interval)
        }
        elem.innerHTML=counter
        counter++
    }, 0.3);
}
 