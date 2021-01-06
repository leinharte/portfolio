'use strict'
/////////////////////////////////////////////
//  1. 화면이 맨 위면, 넷바를 투명하게
/////////////////////////////////////////////

// querySelector를 사용해서 #navbar의 요소를 가져온다
const navbar = document.querySelector('#navbar');
// getBoundingClientRect를 사용해서 navbar의 height를 가져온다
const navbarHeight = navbar.getBoundingClientRect().height;

// 스크롤 될 때마다, 아무 인자를 받지 않고 블럭안을 실행해.
document.addEventListener('scroll',() => {
  console.log(window.scrollY);
  console.log(`navbarHeight: ${navbarHeight}`);
  // 스크롤이 navbar의 높이보다 더 되면, navbar의 클래스에 navbar--dark를 추가하고
  // 작으면 제거한다
  if(window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});