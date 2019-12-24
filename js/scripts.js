

//* ////////////////////////////////////////////////// EVENT LISTENERS /////////////////////////////////////////// *//

//
//

// this sets up the listener for mousemove on title
document.addEventListener('mousemove', fn, false);

let tooltip = document.querySelectorAll('.titletooltip');
let _title = document.getElementById("title");
let _overlay = document.querySelectorAll('.secret-overlay');
let _overlayclose = document.getElementById('close-overlay');
let _overlaytxt = document.getElementById('title-overlay');

TweenMax.set(tooltip, {opacity:0, display:"none"})
TweenMax.set(_overlay, {opacity:0, display:"none"})
TweenMax.set(_overlayclose, {opacity:0, display:"none"})
TweenMax.set(_overlaytxt, {opacity:0, display:"none"})

//so this works on older browsers
_title.addEventListener("mouseenter", function(){tl.play(), false})
_title.addEventListener("mouseleave", function(){tl.reverse(), false})
_title.addEventListener("click", function(){overlaytl.play(), false})
_overlayclose.addEventListener("click", function(){overlaytl.reverse(), false})


//* ////////////////////////////////////////////////// ANIMATIONS /////////////////////////////////////////////// *//

//
//


var overlaytl = gsap.timeline();
    overlaytl.to(_overlay, {opacity:1, display:"block", duration:.5});
    overlaytl.to(_overlayclose, {opacity:1, display:"block", duration:.2});
    overlaytl.to(_overlaytxt, {opacity:1, display:"block", duration:.2})
    overlaytl.pause();

// function dooverlay(event){
//     var overlaytl = gsap.timeline();
//     overlaytl.to(_overlay, {opacity:1, display:"block", duration:.5});
// }

// sets up a timeline and adds the animation for the tool tip, then pauses the animation so it won't play at load time.
var tl = gsap.timeline();
    tl.to(tooltip, {opacity:1, display:"block", duration: .2});
    tl.pause();



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




