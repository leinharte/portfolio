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
//     console.log(event.target.dataset.link); 

// // 우리가 가고자 하는 섹션의 ID를 가져오는 것 까지 됐음.
// // 이제 scrollIntoView를 이용해서 그곳으로 이동..
// const scrollTo = document.querySelector(link);
// // 스므스하게 움직이기 위해 옵션에 { behavior: "smooth"} 추가
// scrollTo.scrollIntoView({behavior: "smooth"});
  scrollIntoViewOurs(link);

});


/////////////////////////////////////////////
//  3. Contact me 버튼을 클릭 했을 때, 스크롤 핸들링
/////////////////////////////////////////////

// (1) querySelector를 사용해서 홈컨택 버튼을 받아온다
// (2) 받아온 버튼에 addEventListener를 사용해서 이벤트를 추가한다.
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', () => {
  scrollIntoViewOurs('#contact');
});

/////////////////////////////////////////////
//  4. 아래로 스크롤 할 때, 홈화면 점점 투명하게
/////////////////////////////////////////////

// (1) 홈의 height를 받아온다
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
// (2) 다큐먼트에 이벤트를 등록한다
// (2-1) 스크롤링이 되면 함수를 호출해 줘
document.addEventListener('scroll', () => {
  // 홈의 높이를 받아 왔는지 확인
  console.log(`homeHeight: ${homeHeight}`);
  console.log(1 - window.scrollY/homeHeight);
// (2-2) 홈의 투명도 조정
// 단, 홈의 배경까지 투명해지고 있어 , html에 가서 홈의 내용을 home_container라는 박스를 만들어서
// 그 안에 넣어준다
  home.style.opacity = 1 - window.scrollY/homeHeight;
})

/////////////////////////////////////////////
//  5. 스크롤이 되면 화살표 버튼이 보이게 한다
/////////////////////////////////////////////
// (5-1) querySelector를 사용해서 html에 있는 화살표 가져오기
const arrowUp = document.querySelector('.arrow-up');
// (5-2 다큐먼트에 이벤트리스너를 추가해서 스크롤이 될 때 함수 호출
document.addEventListener('scroll', () => {
  // 단, 홈에서 반정도 내려오면 아이콘이 생기게 한다.
  // 위 4에서 받아온 homeHeight를 계속 사용한다.
  if(window.scrollY > homeHeight/2) {
    // (5-3) html에 visible을 클래스에 추가한다
    arrowUp.classList.add('visible');
  } else {
    // (5-4) html에 visible을 클래스에서 지운다
    arrowUp.classList.remove('visible');
  }
  });
// (5-5) 클릭하면 맨위로 가기
arrowUp.addEventListener('click', () => {
  scrollIntoViewOurs('#home');
});

/////////////////////////////////////////////
//  6. 프로젝트 필터링
/////////////////////////////////////////////
// (6-1.1) 카테고리 박스 가져오기
const workBtnContainer = document.querySelector('.work__categories');
// (6-1.2) 프로젝트 박스 가져오기
const projectContainer = document.querySelector('.work__projects');
// (6-1.3) querySelectorAll을 사용해서 프로젝트 박스 안에 있는 각각의 프로젝트들을 배열로 받아오기
const projects = document.querySelectorAll('.project');
// (6-2) 버튼 클릭하는 것 받아오기
// 워크버튼컨테이너를 클릭하면 함수 실행
workBtnContainer.addEventListener('click', (e) => {
  // 필더되는 것들 보기
  // 이벤트 e를 받아 와서 이벤트 안에 있는 데이터셋 안에 있는 필터 값들 받아오기
  // const filter = e.target.dataset.filter;
  // 되는지 출력 해보기 -> 원안에 있는 숫자를 클릭하면 undifined 됨.
  // 원안의 숫자는 span이기 때문, span안에는 data-filter가 없다.
  // 필터가 없으면, 혹시 모르니깐 parent 노드에 필터가 있는지 받아와서 출력을 한다.
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;

  // (6-3.1) 필터가 null이면 아무것도 하지 않고,
  if(filter == null) {
    return;
  }
  // (6-3.2) 프로젝트들을 안보이게 만든다
  // 프로젝트를 모두 안보이게 하려면, 우선 선택버튼이 되면 프로젝컨테이너 자체에 클래스를 추가한다
  
  // 이전 거에서 선택을 없애고 새로 클릭된 것에 선택을 추가한다.
  // 현재 클릭된 버튼으로 active 옮기기
  const active = document.querySelector('.category__btn.selected');
  // 기존에 등록된 selected를 제고하고
  active.classList.remove('selected');
  // 새로 선택된 것에 selected 추가한다.
  // (주의) 숫자 span을 클릭하는 경우에 span에 selectedk 추가되지 않게 해야 한다.
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  // 그래서 프로젝트 어레이의 아이템을 forEach 하나당 각각 번갈아 가면서 해준다
    // 0.3초가 지나면 클래스의 anim-out을 없애준다
  setTimeout(() => {
    projects.forEach((project) => {
    // project마다 돌면서 프로젝트 안에 데이타셋 안에 데이타타입을 넣은 것
    console.log(project.dataset.type);

    if(filter === '*' || filter === project.dataset.type) {
      project.classList.remove('invisible');
    } else {
      project.classList.add('invisible');
    }
    });
      projectContainer.classList.remove('anim-out');
    }, 300);
  });
  
  // 참고로 forEach는 다음 두 개와 같다
  // for(let project of projects) {
  // }
  // let project;
  // for(let i = 0; i<projects.length :i++) {
  //   project = projects[i]
  // }

  console.log(filter);


/////////////////////////////////////////////
//  ※ 함수 맨 밑에 위치
/////////////////////////////////////////////
// 중복되는 부분을 함수로 만들어서 사용한다
function scrollIntoViewOurs(selector) {  // 우리가 정의한 함수
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({behavior: "smooth"});  // DOM 요소의 함수
}
// 하나는 우리가 정의해준, 즉, 글로벌 스코프에 정의된 함수가 아니라, 
// DOM 요소 오브젝트에 정의된 함수 이기 때문에, 무한푸프는 걱정하지 않으셔도 되요.
// 동일한 이름이지만 전혀 다른 세계에 있는 함수이기 때문에 이름이 같아도 괜찮아요