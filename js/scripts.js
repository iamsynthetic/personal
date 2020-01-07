

//* ////////////////////////////////////////////////// EVENT LISTENERS /////////////////////////////////////////// *//

//
//

// this sets up the listener for mousemove on title
document.addEventListener('mousemove', fn, false);

let tooltip = document.querySelectorAll('.titletooltip');
let _title = document.getElementById("title");
let _overlay = document.querySelectorAll('.secret-overlay');
let _overlayclose = document.getElementById('close-overlay-btn');
let _overlaytxt = document.getElementById('title-overlay-txt');
let _maillink = document.getElementById('mail-link');
let _mainnav = document.querySelectorAll('main-nav');

TweenMax.set(tooltip, {opacity:0, display:"none"})
TweenMax.set(_overlay, {opacity:0, display:"none"})
TweenMax.set(_overlayclose, {opacity:0, display:"none"})
TweenMax.set(_overlaytxt, {opacity:0, display:"none"})
TweenMax.set(_maillink, {opacity:.4})
//TweenMax.set(_mainnav, {opacity:.4})

//so this works on older browsers
_title.addEventListener("mouseenter", function(){fadeinout(tooltip, 1, "block"), false})
_title.addEventListener("mouseleave", function(){fadeinout(tooltip, 0, "none"), false})
_title.addEventListener("click", function(){showoverlay(), false})
_overlayclose.addEventListener("click", function(){hideoverlay(), false})
_maillink.addEventListener("mouseenter", function(){fadeinout(_maillink, 1, null), false})
_maillink.addEventListener("mouseleave", function(){fadeinout(_maillink, .4, null), false})


//* ////////////////////////////////////////////////// ANIMATIONS /////////////////////////////////////////////// *//

//
//


var navelements = document.querySelectorAll('.main-nav');
navelements.forEach(function(element){
    element.addEventListener('mouseenter', function(e){
        e.preventDefault();
        // let active = document.querySelector('.selected');
        // active.classList.remove('selected');
        // this.classList.add('selected');
        console.log("this is e.target.name " + element.name);
        console.log("this is e.target.id: " + this.target.id);
        if(document.getElementById("nav-secret").style.opacity="0"){
          console.log('nav-secret is set to 0 opacita');
          TweenMax.to(".main-nav", {opacity:.4, duration:.5})
          TweenMax.to(this, {opacity:1, duration:.5})
          TweenMax.to("#nav-secret", {opacity:0, duration:.5})
        }
        else{
          TweenMax.to(".main-nav", {opacity:.4, duration:.5})
          TweenMax.to(this, {opacity:1, duration:.5})
        }
    });
    element.addEventListener('mouseleave', function(e){
        e.preventDefault();
        // let active = document.querySelector('.selected');
        // active.classList.remove('selected');
        // this.classList.add('selected');
        if(document.getElementById("nav-secret").style.opacity="0"){
          console.log('nav-secret is set to 0 opacita');
          TweenMax.to(".main-nav", {opacity:1, duration:.5})
          TweenMax.to(this, {opacity:1, duration:.5})
          TweenMax.to("#nav-secret", {opacity:0, duration:.5})
        }
        else{
          TweenMax.to(".main-nav", {opacity:1, duration:.5})
          TweenMax.to(this, {opacity:1, duration:.5})
          TweenMax.to("#nav-secret", {opacity:1, duration:.5})
        }
    });
});

function showoverlay(){
  TweenMax.to(_overlay, {opacity:1, display:"block", duration:.5})
  TweenMax.to(_overlayclose, {opacity:1, display:"block", duration:.2})
  TweenMax.to(_overlaytxt, {opacity:1, display:"block", duration:.2})
}

function hideoverlay(){
  TweenMax.to(_overlay, {opacity:0, display:"none", duration:.5})
  TweenMax.to(_overlayclose, {opacity:0, display:"none", duration:.2})
  TweenMax.to(_overlaytxt, {opacity:0, display:"none", duration:.2})
}

function fadeinout(obj, opa, disp, dur=.2)
{
    TweenMax.to(obj, {opacity:opa, display:disp, duration:dur})
}



//* ////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////// *//

//
//

// this makes the tool tip above move with the mouse so long as it's over the title
function fn(e) {
    for (var i=tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}

// this is for the random letters animation on the intro headline.
const resolver = {
    resolve: function resolve(options, callback) {
      // The string to resolve
      const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
      const combinedOptions = Object.assign({}, options, {resolveString: resolveString});
      
      function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      
      function randomCharacter(characters) {
        return characters[getRandomInteger(0, characters.length - 1)];
      };
      
      function doRandomiserEffect(options, callback) {
        const characters = options.characters;
        const timeout = options.timeout;
        const element = options.element;
        const partialString = options.partialString;
  
        let iterations = options.iterations;
  
        setTimeout(() => {
          if (iterations >= 0) {
            const nextOptions = Object.assign({}, options, {iterations: iterations - 1});
  
            // Ensures partialString without the random character as the final state.
            if (iterations === 0) {
              element.textContent = partialString;
            } else {
              // Replaces the last character of partialString with a random character
              element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
            }
  
            doRandomiserEffect(nextOptions, callback)
          } else if (typeof callback === "function") {
            callback(); 
          }
        }, options.timeout);
      };
      
      function doResolverEffect(options, callback) {
        const resolveString = options.resolveString;
        const characters = options.characters;
        const offset = options.offset;
        const partialString = resolveString.substring(0, offset);
        const combinedOptions = Object.assign({}, options, {partialString: partialString});
  
        doRandomiserEffect(combinedOptions, () => {
          const nextOptions = Object.assign({}, options, {offset: offset + 1});
  
          if (offset <= resolveString.length) {
            doResolverEffect(nextOptions, callback);
          } else if (typeof callback === "function") {
            //callback();
          }
        });
      };
  
      doResolverEffect(combinedOptions, callback);
    } 
  }
  
  /* Some GLaDOS quotes from Portal 2 chapter 9: The Part Where He Kills You
  * Source: http://theportalwiki.com/wiki/GLaDOS_voice_lines#Chapter_9:_The_Part_Where_He_Kills_You
  */
  const strings = [
    'If You Must Know, My Name Is Chris.'
    // 'You know, being Caroline taught me a valuable lesson. I thought you were my greatest enemy. When all along you were my best friend.',
    // 'The surge of emotion that shot through me when I saved your life taught me an even more valuable lesson: where Caroline lives in my brain.',
    // 'Goodbye, Caroline.',
    // 'You know, deleting Caroline just now taught me a valuable lesson. The best solution to a problem is usually the easiest one. And I\'ll be honest.',
    // 'Killing you? Is hard.',
    // 'You know what my days used to be like? I just tested. Nobody murdered me. Or put me in a potato. Or fed me to birds. I had a pretty good life.',
    // 'And then you showed up. You dangerous, mute lunatic. So you know what?',
    // 'You win.',
    // 'Just go.',
    // 'It\'s been fun. Don\'t come back.',
    // '......'
  ];
  
  let counter = 0;
  
  const options = {
    // Initial position
    offset: 0,
    // Timeout between each random character
    timeout: 1,
    // Number of random characters to show
    iterations: 7,
    // Random characters to pick from
    characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'x', '#', '%', '&', '-', '+', '_', '?', '/', '\\', '='],
    // String to resolve
    resolveString: strings[counter],
    // The element
    element: document.querySelector('[data-target-resolver]')
  }
  
  // Callback function when resolve completes
  function callback() {
    setTimeout(() => {
      counter ++;
      
      if (counter >= strings.length) {
        counter = 0;
      }
      
      let nextOptions = Object.assign({}, options, {resolveString: strings[counter]});
      resolver.resolve(nextOptions, callback);
    }, 10000);
  }
  
  resolver.resolve(options, callback);




