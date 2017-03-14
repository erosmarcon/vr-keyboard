# VRKeyboard

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
        var sceneCss, rendererCss;

        function init(element)
        {
            container= document.getElementById(element);
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 20000);
            sceneCss = new THREE.Scene();
            rendererCss = new THREE.CSS3DRenderer();
            rendererCss.setSize(window.innerWidth, window.innerHeight);
            rendererCss.domElement.style.position = 'absolute';
            rendererCss.domElement.style.top = 0;
            container.appendChild(rendererCss.domElement);
            camera.position.set(0, 0, 1500);
            camera.lookAt(new THREE.Vector3(0,0,0))
            window.addEventListener('resize', onWindowResize, false);
            animate();
        }

        function onWindowResize()
        {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            rendererCss.setSize(window.innerWidth, window.innerHeight);
        }
        function animate()
        {
            requestAnimationFrame(animate);
            rendererCss.render(sceneCss, camera);
        }
    </script>

    <body onload="init('container')">
        <div id="container"></div>
    </body>

## How to use

### Basic:

Instantiate a VRKeyboard and listen for update event:

    var vrKeyboard=new VRKeyboard()
    vrKeyboard.addEventListener('update' , function(e){
        console.log(e.code)
    })
    sceneCss.add(vrKeyboard)

### With VR text inputs in 3D space:
