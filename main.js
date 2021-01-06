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
/////////////////////////////////////////////
//  2. 메뉴 아이템을 클릭 했을 때, 스크롤 핸들링
/////////////////////////////////////////////

// 넷바의 메뉴요소를 받아오기
const navbarMenu = document.querySelector('.navbar__menu');
// navbarMenu에 이벤트 추가하기: 클릭이 되면 블록({})을 실행한다.
// test(1) ////////////////////////
// navbarMenu.addEventListener('click', () => {
//   console.log('dsf');
// });
// test(2) ////////////////////////
// 클릭이 되면, 클릭한 이벤트가 들어온다(즉, 함수의 인자가 된다). 이 event를 이용해서 해볼 건데요.
// 클릭이 되는 아이템의 이벤트에 타깃은 우리가 클릭한 요소가 출력될 거예요
// navbarMenu.addEventListener('click', (event) => {
//   console.log(event.target);
// });
// test(3) ////////////////////////
// html에 data-를 이용해서 "data-link="#home""추가한 후에,
// dataset이라는 것에 우리가 정의한 변수들이 할당이 되어지는데,
// dataset 안에 data-link라고 했으니까 link를 찍어보면, 우리가 정의한 ID가 출력된다
//   navbarMenu.addEventListener('click', (event) => {
//   console.log(event.target.dataset.link);
// });
// test(4) ////////////////////////
// 넷바 메뉴를 클릭하면 undeined로 나오는데, 이것을 다음과 같이 처리한다.
// 즉, link가 null이 아닌 경우에만 실행된다.
  navbarMenu.addEventListener('click', (event) => {
    const target = event.target;
    const link = target.dataset.link;
    if (link==null) {
      return;
    }
    console.log(event.target.dataset.link); 

// 우리가 가고자 하는 섹션의 ID를 가져오는 것 까지 됐음.
// 이제 scrollIntoView를 이용해서 그곳으로 이동..
const scrollTo = document.querySelector(link);
// 스므스하게 움직이기 위해 옵션에 { behavior: "smooth"} 추가
scrollTo.scrollIntoView({behavior: "smooth"});


});