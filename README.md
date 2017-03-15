# VRKeyboard

<p align="center">
  <img src="https://github.com/erosmarcon/VRKeyboard/blob/master/images/screenshots/VRKeyboard-shot-1.png"/>
</p>

## What is
A keyboard input based on [THREE.js](https://threejs.org/) for virtual reality experiences or just as an alternative to the standard on-screen keyboard on touch devices.

## How to setup

Include THREE.js library, THREECSS3DRenderer and VRKeyboard:

    <script src="libs/three.min.js"></script>
    <script src="js/threejs/renderers/CSS3DRenderer.js"></script>
    <script src="js/VRKeyboard.js"></script>


Create a basic 3D scene and render with CSS3DRenderer:

    <script>
        var container;
        var camera;
        var scene, renderer;

        function init(element){
            container= document.getElementById(element);
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
            scene = new THREE.Scene();
            renderer = new THREE.CSS3DRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.domElement.style.position = 'absolute';
            renderer.domElement.style.top = 0;
            container.appendChild(renderer.domElement);
            camera.position.set(0, 0, 1500);
            camera.lookAt(new THREE.Vector3(0,0,0))
            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function onWindowResize(){
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function animate(){
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    </script>

    <body onload="init('container')">
        <div id="container"></div>
    </body>

## How to use

### Basic:

Instantiate a VRKeyboard and listen for keypress event:

    var vrKeyboard=new VRKeyboard()
    vrKeyboard.addEventListener('keypress' , function(e){
        console.log(e.code)
    })
    scene.add(vrKeyboard)

### With VRTextInput/s in 3D space:

Add and layout VRTextInput instances as necessary, for example:

    var usernameTxt=new VRTextInput('user');
    usernameTxt.setWidth(400);
    usernameTxt.position.set(0,300,0);
    scene.add(usernameTxt);

    var passwordTxt=new VRTextInput('password');
    passwordTxt.position.set(0,220,0);
    passwordTxt.setWidth(400);
    passwordTxt.displayAsPassword(true);
    scene.add(passwordTxt);

Register VRTextInput instances to the VRKeyboard:

      vrKeyboard.register(usernameTxt);
      vrKeyboard.register(passwordTxt);

Get the VRTextInput value:

    console.log(usernameTxt.getValue());

## How to style

VRKeyboard exposes a setStyle() method for basic customization. It accepts three arguments: key color (hex), label color (hex) and rounded keys (boolean).

Example:

    //Red base with yellow labels and rounded keys
    vrKeyboard.setStyle("0xD90000", "0xFFD24D", true);

Same logic applies to VRTextInput styling:

    //Red background with yellow text and rounded border
    usernameTxt.setStyle("0xD90000", "0xFFD24D", true);

If you want to go more in depth on styling and customizing, you can edit any css rule in javascript source code to suit your needs.

## Examples

WIP