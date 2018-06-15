# VRKeyboard

<p align="center">
  <img src="https://github.com/erosmarcon/VRKeyboard/blob/master/images/screenshots/VRKeyboard-shot-1.png"/>
</p>


## What is
A keyboard input based on [THREE.js](https://threejs.org/) for virtual reality experiences or just as an alternative to the standard on-screen keyboard on touch devices.

## How to setup

Include THREE.js library and VRKeyboard:
```html
<script src="libs/three.min.js"></script>
<script src="js/VRKeyboard.js"></script>
```

Create a basic 3D scene:
```html
<script>
    var container;
    var camera;
    var scene, renderer;
    var vrKeyboard;

    function init(element){
        container= document.getElementById(element);
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
        scene = new THREE.Scene();
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        camera.position.set(0, 0, 1500);
        camera.lookAt(new THREE.Vector3(0,0,0))
        animate();
    }

    function animate(){
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
</script>

<body onload="init('container')">
    <div id="container"></div>
</body>
```
## How to use

### Basic:

Instantiate a VRKeyboard passing a reference to current scene, camera and renderer:
```js
var vrKeyboard = new VRKeyboard(scene, camera, renderer)
```

Call the VRKeyboard update in the rendering loop:
```js
function animate(){
  vrKeyboard.update()
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
```

Listen for events:
```js
vrKeyboard.addEventListener("keydown", function(e){
  console.log("You pressed the: "+e.code+" key")
}
```

Supported events are:

* keydown
* keyup
* keyover
* keyout
* keyhold (long press)

### With VRTextInput/s in 3D space:

Add and layout VRTextInput instances as necessary, for example:
```js
var usernameTxt = new VRTextInput();
usernameTxt.width = 400;
usernameTxt.position.set(0,300,0);

var passwordTxt = new VRTextInput();
passwordTxt.width = 400
passwordTxt.position.set(0,220,0);
passwordTxt.displayAsPassword = true;
```

Register VRTextInput instances to the VRKeyboard:
```js
vrKeyboard.addField(usernameTxt);
vrKeyboard.addField(passwordTxt);
```

Registered fields automatically receive focus when clicked.

To set focus programmatically assign it as target of the VRKeyboard:
```js
vrKeyboard.target = usernameTxt;
```

Then type something and get the VRTextInput value, e.g.:
```js
vrKeyboard.addEventListener("keydown", function(e){
    if(e.code == Unicode.ENTER){
        console.log(usernameTxt.value);
    }
}
```

## How to style

VRKeyboard exposes the following attributes for basic customization:

* keyColor
* keyDownColor
* labelColor
* labelDownColor
* borderColor
* borderDownColor
* borderRadius

Example:
```js
//Red key background with yellow labels and no rounded corners

vrKeyboard.keyColor="#D90000";
vrKeyboard.labelColor="#FFD24D";
vrKeyboard.borderColor="#FFD24D";
vrKeyboard.keyDownColor="#B20000";
vrKeyboard.labelDownColor="#FFBF00";
vrKeyboard.borderDownColor="#D90000";
vrKeyboard.borderRadius=0
```

VRTextInput styling woks similar:
```js
//Red background with yellow text and no rounded corners

searchTxt.backgroundColor="#D90000";
searchTxt.textColor="#FFD24D"
searchTxt.borderColor="#FFD24D";
searchTxt.backgroundFocusColor="#B20000";
searchTxt.textFocusColor="#FFBF00"
searchTxt.borderFocusColor="#FF0000";
searchTxt.borderRadius=0
```

If you want to go more in depth on styling and customizing, have a look at the draw() and drawKey() methods.

## Examples

* [Basic, TextInputs, Styling and a Complete 3D Scene](http://www.uxvision.it/projects/VRKeyboard/examples/index.html)
