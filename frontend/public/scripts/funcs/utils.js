// Alert display successful login, error
const showSwal=(title,icon,buttons,callback)=>{
    swal({
        title,
        icon,
        buttons
      }).then(result=>callback(result))
   
} 
// This function is used to store data in LocalStorage

const saveIntoLocalStorege=(key,value)=>{
  return localStorage.setItem(key,JSON.stringify(value))
}
// This function is designed to read data from LocalStorage.

const getFromLocalStorage=(key)=>{
  return JSON.stringify(localStorage.getItem(key))
}
// This function is used to get user token from LocalStorage.

const getToken=()=>{
  const userInfos= JSON.parse(localStorage.getItem('user'));
  // console.log('rrrrrrrrrrr',userInfos.token);
  
  return userInfos? userInfos.token :null
}
const isLogin=()=>{
  const userInfos=localStorage.getItem('user')
  return userInfos? true : false
}

const getUrlparam=(key)=>{
  const urlparams=new URLSearchParams(window.location.search)
  // console.log(new URLSearchParams(window.location.search));
  
  // console.log("ccccc",urlparams);
  
  // console.log('مقدار توکن', urlparams.get(key));
  
  return urlparams.get(key)
} 
const searchInArray=(array,searchProperty,searchvalue)=>{
  
  let outputArray=array.filter(item=>item[searchProperty].includes(searchvalue))
  return outputArray
}
const addparamToUrl=(param,value)=>{
  // console.log(param,value);
  let url=new URL(location.href)
  let searchparams=url.searchParams
  searchparams.set(param,value)
  url.search=searchparams.toString()
  location.href=url.toString()
  // console.log(url.toString());
  
}
const paginateItem=(array,itemsPerPage,paginateParentElem,currentPage)=>{
  paginateParentElem.innerHTML=''
  let endIndex=itemsPerPage*currentPage
  let startIndex=endIndex-itemsPerPage
  let paginatedItems=array.slice(startIndex,endIndex)
  let paginatedCount=Math.ceil(array.length/itemsPerPage)
// console.log();

  for (let i = 1; i <paginatedCount+1; i++) {
    paginateParentElem.insertAdjacentHTML('beforeend',`
       <li class="">
       ${
        i===Number(currentPage)?`
        <a  onclick=addparamToUrl('page',${i})  class="courses-pagination-link courses-pagination-link_active">
                ${i}
        </a>
        </li>
        `:`
         <a  onclick=addparamToUrl('page',${i}) class="courses-pagination-link ">
                ${i}
        </a>
        `
       }
            
      `)
    
  }
  return paginatedItems
}
export{
  showSwal,
  saveIntoLocalStorege,
  getFromLocalStorage,
  getToken,
  isLogin,
  getUrlparam,
  searchInArray,
  paginateItem,
  addparamToUrl
}