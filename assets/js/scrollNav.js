const navLogo = document.querySelector('nav > .navCol2 > .navLogo > img');
const navBg = document.querySelector('nav');
let defaulScrollY = window.scrollY;
console.log(navLogo)
window.addEventListener('scroll',function(){
    if(defaulScrollY > window.scrollY){
        navLogo.classList.remove('imgLogoWidht1')
        navBg.classList.remove('navBg')
    }else{
        navLogo.classList.add('imgLogoWidht1')
        navBg.classList.add('navBg')
    }
    if(this.window.scrollY > 180){
        navLogo.classList.add('imgLogoWidht1')
        navBg.classList.add('navBg')
    }else{
        navLogo.classList.remove('imgLogoWidht1')
        navBg.classList.remove('navBg')
    }
    defaulScrollY = window.scrollY;
});