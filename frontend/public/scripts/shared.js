import { getMe } from "./funcs/auth.js";
import {showUserNameInVavbar,renderTopbarMenus,getAndShowNavbarMenus,createNewNewsLettes} from './funcs/shaed.js'

window.addEventListener('load',()=>{
    showUserNameInVavbar()
    renderTopbarMenus()
     getAndShowNavbarMenus()

})