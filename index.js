let str = `I\'m Mengyu Xie, welcome to my resume page! \nooops...,You say this page is too rough?\nWell, it really is.\n(°:з」∠)_,那我就将简历变得好看点把。\n咦，你怎么突然说中文了。。。\n可能是国际化失败吧 !（￣︶￣）↗ \n冲鸭`
const randColor  = [
  { main: '#FBDB4A', shades: ['#FAE073', '#FCE790', '#FADD65', '#E4C650'] },
  { main: '#F3934A', shades: ['#F7B989', '#F9CDAA', '#DD8644', '#F39C59'] },
  { main: '#EB547D', shades: ['#EE7293', '#F191AB', '#D64D72', '#C04567'] },
  { main: '#9F6AA7', shades: ['#B084B6', '#C19FC7', '#916198', '#82588A'] },
  { main: '#5476B3', shades: ['#6382B9', '#829BC7', '#4D6CA3', '#3E5782'] },
  { main: '#2BB19B', shades: ['#4DBFAD', '#73CDBF', '#27A18D', '#1F8171'] },
  { main: '#70B984', shades: ['#7FBE90', '#98CBA6', '#68A87A', '#5E976E'] }
];

class component {
  constructor(context,offset_x,offset_y,speed,R,type,cb,colorindex){
    this.name = 'test';
    this.context = context;
    this.type = type;
    this.R = R;
    this.cb = cb;
    this.colornum = colorindex; 
    // this.startx = Math.random()*(50) - 25 ;
    // this.starty = Math.random()*(50) - 25 ;
    this.startx = (Math.random()*30 +10)*Math.cos((Math.random()*2*Math.PI));
    this.starty = (Math.random()*30 +10)*Math.sin(Math.random()*(2*Math.PI));
    this.endx = this.startx*3;
    this.endy = this.starty*3;
    this.currentx = this.startx;
    this.currenty = this.starty;
    this.offset_x = offset_x;
    this.offset_y = offset_y;
    this.animate = this.animate.bind(this)
    this.id = null;
    this.init();
    this.add();
    this.animate();
  }
  init(){
    ///需要修改 
    this.el = document.createElementNS('http://www.w3.org/2000/svg', this.type);
    let area = 50;
    let color = '#eee';
    if (this.type === 'circle') {
      this.r = 2 + Math.random()*4;
      this.el.setAttribute('r',(Math.random()*4 + 1));
      this.el.setAttribute('cx',this.startx + this.offset_x);
      this.el.setAttribute('cy',this.starty + this.offset_y);
    } else if(this.type === 'polygon'){
      
      this.r = 4 + Math.random()*6;
      this.thr1 = {
        x:(this.startx + Math.cos(Math.random()*(2*Math.PI))*(this.r)), 
        y:(this.starty + Math.sin(Math.random()*(2*Math.PI))*(this.r))
      };
      this.thr2 = {
        x:(this.startx + Math.cos(Math.random()*(2*Math.PI))*(this.r)), 
        y:(this.starty + Math.sin(Math.random()*(2*Math.PI))*(this.r))
      };
      this.thr3 = {
        x:(this.startx + Math.cos(Math.random()*(2*Math.PI))*(this.r)), 
        y:(this.starty + Math.sin(Math.random()*(2*Math.PI))*(this.r))
      };
      this.el.setAttribute("points",`${this.thr1.x+ this.offset_x} ${this.thr1.y+this.offset_y},${this.thr2.x+this.offset_x} ${this.thr2.y+this.offset_y},${this.thr3.x+this.offset_x} ${this.thr3.y+this.offset_y}`); 
      // this.el.setAttribute("points",`${this.thr1.x} ${this.thr1.y},${this.thr2.x} ${this.thr2.y},${this.thr3.x} ${this.thr3.y}`); 
      color = randColor[this.colornum].shades[Math.floor(Math.random()*4)];
    }
    
   
    console.log(color)
    this.el.style.fill = color;
  }
  add(){
    this.context.appendChild(this.el);
    this.cb();
  }
  unmounted(){
    this.context.removeChild(this.el);
  }
  animate(){
    let that = this;
    let lx = 0;
    let ly = 0;
    this.id = setInterval(function(){
      that.currentx += (that.endx-that.startx)/30;
      that.currenty += (that.endy-that.starty)/30;
      lx += (that.endx-that.startx)/30;
      ly += (that.endy-that.starty)/30;
      that.el.setAttribute('transform',`translate(${that.currentx} ${that.currenty})`)    
      if(ly**2+lx**2>((that.R)**2)){
        clearInterval(that.id);
        that.unmounted()
      }
    
    },30) 
    
  }
  
}

class click_svg_effct {
  //props --> speed R c_num t_num
  constructor(option){
    //重点 不能用createlement
    //
    this.context = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.context.style.zIndex = 1;
    //
    //
    this.speed = option.speed || 2;
    this.unmountednum = 0;
    this.R = option.R || 8;
    this.c_num = option.c_num ||6//6;
    this.t_num = option.t_num ||8//8;
    this.context.style.width = '100vw';
    this.context.style.height = '100vh';
    this.context.style.left = 0;
    this.context.style.top = 0;
    this.context.style.position = 'absolute';
    document.getElementsByTagName('body')[0].appendChild(this.context)
    this.unmountednumchange = this.unmountednumchange.bind(this)
  }
  addcomponets(offset_x,offset_y,colorindex){
    // this.context.style.zIndex = 999;
 
    for (let index = 0; index < this.c_num; index++) {
      new component(this.context,offset_x,offset_y,this.speed,this.R,'circle',this.unmountednumchange,colorindex)
     }
     for (let index = 0; index < this.t_num ; index++) {
       new component(this.context,offset_x,offset_y,this.speed,this.R,'polygon',this.unmountednumchange,colorindex)
     }
     //

  }
  unmountednumchange(){
    this.unmountednum++;
    if(this.unmountednum >= (this.c_num + this.t_num)){
      // this.context.style.zIndex = -999;
      //console.log(-999)
    }
  }
  envent(x,y,colorindex){
    //this.context.style.left = (e.clientX - 50);
    //this.context.style.top = (e.clientY - 50);
    //console.log('ddfsgdsfgdsf')
    this.addcomponets(x,y,colorindex);
  }
 
}

let s = new click_svg_effct({});


// class bindvalue {

//   constructor(str){
//     this.value = str;
//     Object.defineProperty(this, str, {
      
//       get: function() {
//           console.log('get val:'+ value);
//           return str;
//    　 },
//   　　set: function(newVal) {
//         str = newVal;
//         document.querySelector('#resume').innerHTML(newVal)
//       }
//   })
//   }


// }

class bindvalue {
  constructor(str){
    let value = null;
    Object.defineProperty(this, 'value', {
      get: function() {
       
        return value;
      },
      set: function(newVal) {
        value = newVal;
        document.querySelector('#resume').innerText=(newVal)
      }
    })
  }
}
// delay 随机的速度 模仿打字时的速度不一样
function randDelay(min, max) {
	return Math.floor(Math.random() * (max-min+1)+min);
}

function autorun (){
  document.querySelector('#resume').className = 'center'
  let bind = new bindvalue(str)
  let strArr = str.split('')
  let currentStr = '';
  let index = 0;
  // let timerid = setInterval(function(){
  //   bind.value = currentStr + strArr[index];
  //   currentStr += strArr[index];
  //   index++;
  //   if (index === strArr.length) {
  //     clearInterval(timerid)
  //   }
  // },500)
  function addletter(){
    currentStr += strArr[index];
    index++;
    if(index<strArr.length){
      setTimeout(()=>{
        addletter()
        if(index === (strArr.length)){
          bind.value =  currentStr;
          let i = 3;
          let Countdown = function(){
            setTimeout(()=>{
              bind.value =  currentStr + (i--);
              if(i > -1){
                Countdown()
              } else {
                changestyle()
              }
            }
            ,1000)
          }
          Countdown()     
        } else {
          bind.value =  currentStr + '_';
        }     
      },randDelay(1,2))
    }

  }
  addletter()
}

function changestyle(){
 
  let body  = document.querySelector('body');
  body.removeChild( document.querySelector('#resume'));
  body.className =  'bodychange';
  container = document.createElement('p');
  container.className = 'container';
  body.appendChild(container);
  autoaddchar()
}

function addletter(char,cb){
  let el = document.createElement('div');
  el.className = 'char';
  let colorindex = Math.floor(Math.random()*7)
  el.style.color = randColor[colorindex].main;
  el.style.fontSize = '40px';
 
  if(char === ' '){
    el.style.minWidth = '20px';
  }
  if(char === '\n'){
    
    el.style.display = 'block';
  } else {
    el.innerText = char;
  }
 
  document.getElementsByClassName('container')[0].appendChild(el);
  //har.style.webkitTransform =`translate(0px,${-(char.offsety)}px)`;
  // console.log(el.clientWidth, //获取元素的宽度（width+padding）
  //   el.clientHeight, //元素的高度
  //   el.offsetLeft, //元素相对于父元素的left
  //   el.offsetTop, //元素相对于父元素的top
  //   el.offsetWidth, //元素的宽度(width+padding+border)
  //   el.offsetHeight) //元素的高度)
  s.envent(el.offsetLeft,el.offsetTop,colorindex) 
  charAnimate(el,cb)
}

function charAnimate(char,cb){
  let isback = false;
  // let delta = 1
  let offsety = Math.floor(Math.random()*(20) + (.5)*40);
  let t = (Math.random() >(.5))?(1):(-1)
  let roatedeg = Math.floor(Math.random()*(40) + 30)*t;
  let currentoffsety = 0;
  let currentoffsetdeg = 0;
  let v = Math.floor(32*offsety/100);
  let rv = Math.floor(16*roatedeg/100);
  let timeid = setInterval(()=>{
    currentoffsety += v;
    currentoffsetdeg += rv;
    char.style.transform =`translate(0px,${-(currentoffsety)+v}px)  rotate(${(currentoffsetdeg+rv)}deg)`;
  
    if(currentoffsety >= offsety){
      isback = true;
      v = -v;
      rv = -rv;
    } else if(currentoffsety<0){
      char.style.transform =`translate(0px,0px) rotate(0deg)`
      clearInterval(timeid);
      cb()
    }
  },16)
  
}
let index = 0;
function autoaddchar(){
  let strarr = str.split('');
  if(index< strarr.length){
    addletter(strarr[index],autoaddchar)
  }
  index++;
}
autorun()

