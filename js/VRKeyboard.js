VRKey=function(data, xPos, yPos)
{
    this.code=data.c;
    this.x=xPos;
    this.y=yPos;

    switch (data.type) {
        case 'standard':
            this.width = 70;
            this.height = 60;
            break;

        case 'delete':
            this.width = 80;
            this.height = 60;
            break;

        case 'space':
            this.width = 315;
            this.height = 60;
            break;

        case 'enter':
            this.width = 150;
            this.height = 60;
            break;

        case 'shift':
            this.width = 80;
            this.height = 60;
            break;

        case 'alt':
            this.width = 80;
            this.height = 60;
            break;

        case 'tab':
            this.width = 80;
            this.height = 60;
            break;

        case 'abc':
            this.width = 100;
            this.height = 60;
            break;

        case 'shift':
            this.width = 80;
            this.height = 60;
            break;

        case 'num':
            this.width = 100;
            this.height = 50;
            break;

        default:
            this.width = 70;
            this.height = 60;
    }

    this.collides=function(point3D)
    {
        return (point3D.x> this.getBounds().left && point3D.x<this.getBounds().right && point3D.y>this.getBounds().top && point3D.y <this.getBounds().bottom);
    }


    this.getBounds=function()
    {
        return {top:this.y, left:this.x, bottom:this.y+this.height, right:this.x+this.width};
    }

}

const Unicode =
{
    DELETE: '\u232B',
    ENTER: '\u23CE',
    SHIFT: '\u21E7',
    SPACE: '\u2423',
    TAB: '\u21E5'
}

VRKeyboard = function (scene, camera) {

    THREE.Group.apply(this);

    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.pointerX=0;
    this.pointerY=0;
    this.fields=[];

    this.referenceText="";

    //styling
    this._keyColor='#666666';
    Object.defineProperty(VRKeyboard.prototype, 'keyColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._keyColor },
        set: function(value) {
            this._keyColor=value
            this.build(this.currentType)

        }
    });

    this._keyOverColor='#333333';
    Object.defineProperty(VRKeyboard.prototype, 'keyOverColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._keyOverColor },
        set: function(value) {
            this._keyOverColor=value
            this.build(this.currentType)

        }
    });

    this._labelColor='#99FF33';
    Object.defineProperty(VRKeyboard.prototype, 'labelColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._labelColor },
        set: function(value) {
            this._labelColor=value
            this.build(this.currentType)

        }
    });

    this._labelOverColor='#99FF33';
    Object.defineProperty(VRKeyboard.prototype, 'labelOverColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._labelOverColor },
        set: function(value) {
            this._labelOverColor=value
            this.build(this.currentType)

        }
    });

    this._borderColor='#333333';
    Object.defineProperty(VRKeyboard.prototype, 'borderColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderColor },
        set: function(value) {
            this._borderColor=value
            this.build(this.currentType)

        }
    });

    this._borderOverColor='#99FF33';
    Object.defineProperty(VRKeyboard.prototype, 'borderOverColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderOverColor },
        set: function(value) {
            this._borderOverColor=value
            this.build(this.currentType)

        }
    });

    this._borderRadius=26;
    Object.defineProperty(VRKeyboard.prototype, 'borderRadius', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderRadius },
        set: function(value) {
            this._borderRadius=value
            this.build(this.currentType)

        }
    });

    this._target=null;

    Object.defineProperty(VRKeyboard.prototype, 'target', {
        enumerable: true,
        configurable: true,
        get: function() { return this._target },
        set: function(field) {

            for (var i in this.fields)
            {
                this.fields[i].blur();
            }
            if(field)
            {
                this._target=field;
                this.referenceText=this.target.value;
                this._target.focus();
            }
            else
            {
                this._target=null;
                this.referenceText="";
            }
        }
    });


    const KeyBoardTypes =
    {
        NUMBER_PAD: "number_pad",
        NUMERIC: "numeric",
        NUMERIC_ALT: "numeric_alt",
        ALPHABETS_LOWER: "alphabets_lower",
        ALPHABETS_UPPER: "alphabets_upper"
    }

    var numeric =
        [
            [
                {c: '1', type: 'standard'},
                {c: '2', type: 'standard'},
                {c: '3', type: 'standard'},
                {c: '4', type: 'standard'},
                {c: '5', type: 'standard'},
                {c: '6', type: 'standard'},
                {c: '7', type: 'standard'},
                {c: '8', type: 'standard'},
                {c: '9', type: 'standard'},
                {c: '0', type: 'standard'}
            ],
            [
                {c: '@', type: 'standard'},
                {c: '#', type: 'standard'},
                {c: '$', type: 'standard'},
                {c: '%', type: 'standard'},
                {c: '*', type: 'standard'},
                {c: '-', type: 'standard'},
                {c: '+', type: 'standard'},
                {c: '(', type: 'standard'},
                {c: ')', type: 'standard'}
            ],
            [
                {c: '#+=', type: 'alt'},
                {c: '!', type: 'standard'},
                {c: '"', type: 'standard'},
                {c: "'", type: 'standard'},
                {c: ':', type: 'standard'},
                {c: ';', type: 'standard'},
                {c: ',', type: 'standard'},
                {c: '?', type: 'standard'},
                {c: Unicode.DELETE, type: 'delete'}
            ],
            [
                {c: 'ABC', type: 'abc'},
                {c: '/', type: 'standard'},
                {c: Unicode.SPACE, type: 'space'},
                {c: '.', type: 'standard'},
                {c: Unicode.ENTER, type: 'enter'}
            ]
        ];

    var number_pad =
        [
            [
                {c: '1', type: 'num'},
                {c: '2', type: 'num'},
                {c: '3', type: 'num'}
            ],
            [
                {c: '4', type: 'num'},
                {c: '5', type: 'num'},
                {c: '6', type: 'num'}
            ],
            [
                {c: '7', type: 'num'},
                {c: '8', type: 'num'},
                {c: '9', type: 'num'}
            ],
            [
                {c: '*', type: 'num'},
                {c: '0', type: 'num'},
                {c: '#', type: 'num'}
            ],
            [
                {c: Unicode.DELETE, type: 'delete'},
                {c: Unicode.ENTER, type: 'enter'}
            ]
        ];

    var numeric_alt =
        [
            [
                {c: '~', type: 'standard'},
                {c: '`', type: 'standard'},
                {c: '|', type: 'standard'},
                {c: '•', type: 'standard'},
                {c: '√', type: 'standard'},
                {c: 'π', type: 'standard'},
                {c: '÷', type: 'standard'},
                {c: 'x', type: 'standard'},
                {c: '{', type: 'standard'},
                {c: '}', type: 'standard'}
            ],
            [

                {c: '₤', type: 'standard'},
                {c: '#', type: 'standard'},
                {c: '€', type: 'standard'},
                {c: '°', type: 'standard'},
                {c: '^', type: 'standard'},
                {c: '_', type: 'standard'},
                {c: '=', type: 'standard'},
                {c: '[', type: 'standard'},
                {c: ']', type: 'standard'}
            ],
            [
                {c: '123', type: 'alt'},
                {c: '™', type: 'standard'},
                {c: '®', type: 'standard'},
                {c: "©", type: 'standard'},
                {c: '¶', type: 'standard'},
                {c: '\/', type: 'standard'},
                {c: '<', type: 'standard'},
                {c: '>', type: 'standard'},
                {c: Unicode.DELETE, type: 'delete'}
            ],
            [
                {c: 'ABC', type: 'abc'},
                {c: ',', type: 'standard'},
                {c: Unicode.SPACE, type: 'space'},
                {c: '.', type: 'standard'},
                {c: Unicode.ENTER, type: 'enter'}
            ]
        ];

    var alphabets_lower =
        [
            [
                {c: 'q', type: 'standard'},
                {c: 'w', type: 'standard'},
                {c: 'e', type: 'standard'},
                {c: 'r', type: 'standard'},
                {c: 't', type: 'standard'},
                {c: 'y', type: 'standard'},
                {c: 'u', type: 'standard'},
                {c: 'i', type: 'standard'},
                {c: 'o', type: 'standard'},
                {c: 'p', type: 'standard'}
            ],
            [
                {c: 'a', type: 'standard'},
                {c: 's', type: 'standard'},
                {c: 'd', type: 'standard'},
                {c: 'f', type: 'standard'},
                {c: 'g', type: 'standard'},
                {c: 'h', type: 'standard'},
                {c: 'j', type: 'standard'},
                {c: 'k', type: 'standard'},
                {c: 'l', type: 'standard'}
            ],
            [
                {c: Unicode.SHIFT, type: 'shift'},
                {c: 'z', type: 'standard'},
                {c: 'x', type: 'standard'},
                {c: 'c', type: 'standard'},
                {c: 'v', type: 'standard'},
                {c: 'b', type: 'standard'},
                {c: 'n', type: 'standard'},
                {c: 'm', type: 'standard'},
                {c: Unicode.DELETE, type: 'delete'}
            ],
            [
                {c: '?123', type: 'abc'},
                {c: '/', type: 'standard'},
                {c: Unicode.SPACE, type: 'space'},
                {c: '.', type: 'standard'},
                {c: Unicode.ENTER, type: 'enter'}
            ]
        ];

    var alphabets_upper =
        [
            [
                {c: 'Q', type: 'standard'},
                {c: 'W', type: 'standard'},
                {c: 'E', type: 'standard'},
                {c: 'R', type: 'standard'},
                {c: 'T', type: 'standard'},
                {c: 'Y', type: 'standard'},
                {c: 'U', type: 'standard'},
                {c: 'I', type: 'standard'},
                {c: 'O', type: 'standard'},
                {c: 'P', type: 'standard'}
            ],
            [
                {c: 'A', type: 'standard'},
                {c: 'S', type: 'standard'},
                {c: 'D', type: 'standard'},
                {c: 'F', type: 'standard'},
                {c: 'G', type: 'standard'},
                {c: 'H', type: 'standard'},
                {c: 'J', type: 'standard'},
                {c: 'K', type: 'standard'},
                {c: 'L', type: 'standard'}
            ],
            [
                {c: Unicode.SHIFT, type: 'shift'},
                {c: 'Z', type: 'standard'},
                {c: 'X', type: 'standard'},
                {c: 'C', type: 'standard'},
                {c: 'V', type: 'standard'},
                {c: 'B', type: 'standard'},
                {c: 'N', type: 'standard'},
                {c: 'M', type: 'standard'},
                {c: Unicode.DELETE, type: 'delete'}
            ],
            [
                {c: '?123', type: 'abc'},
                {c: '/', type: 'standard'},
                {c: Unicode.SPACE, type: 'space'},
                {c: '.', type: 'standard'},
                {c: Unicode.ENTER, type: 'enter'}
            ]
        ];


    this.init = function ()
    {
        var self = this;
        this.padding = 20;
        this.spacing = 10;
        this.layouts = {};
        this.currentType = KeyBoardTypes.ALPHABETS_LOWER;
        this.layouts[KeyBoardTypes.NUMBER_PAD] = number_pad;
        this.layouts[KeyBoardTypes.NUMERIC] = numeric;
        this.layouts[KeyBoardTypes.NUMERIC_ALT] = numeric_alt;
        this.layouts[KeyBoardTypes.ALPHABETS_LOWER] = alphabets_lower;
        this.layouts[KeyBoardTypes.ALPHABETS_UPPER] = alphabets_upper;
        this.keys = [];
        this.rows = [];

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.width = 0 // Keyholder  total width
        this.height = 0 // Keyholder  total height


        document.addEventListener('mousedown', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;

            var key=self.getInput(self.pointerX, self.pointerY)
            if(key)
                self.onKeyDown(key);

        }, true);


        document.addEventListener('mousemove', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;

        }, false);

        document.addEventListener('mouseup', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;
            var key=self.getInput(self.pointerX, self.pointerY)
            if(key)
                self.onKeyUp(key)
        }, false);

        this.build();
    }


    this.clear = function () {
        for( var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].geometry.dispose();
            this.children[i].material.dispose()
            this.remove(this.children[i])
        }
        this.context.clearRect(0,0, this.width, this.height);
        this.width = 0
        this.height = 0
    }

    this.build = function (layout) {

        this.clear()
        this.keys = []
        if (layout != null) this.currentType = layout;
        this.currentLayout = this.layouts[this.currentType];

        var xPos = 0;
        var yPos = 0;

        this.rows = []

        for (var rowIndex = 0; rowIndex < this.currentLayout.length; rowIndex++) {
            var row = {keys: [], width: 0}


            for (var columnIndex = 0; columnIndex < this.currentLayout[rowIndex].length; columnIndex++) {
                var keyData = this.currentLayout[rowIndex][columnIndex]; //key object
                var key = new VRKey(keyData, xPos, yPos);
                row.keys.push(key)
                xPos += key.width + this.spacing;
                row.width = xPos - this.spacing;
                if (row.width > this.width) // Single row total Width
                    this.width = row.width;
            }
            xPos = 0;
            yPos += (key.height + this.spacing);
            this.height += key.height;
            if (rowIndex < this.currentLayout.length - 1)
                this.height += this.spacing;
            this.rows.push(row);
        }
        // Calculate case size
        this.width += this.padding * 2;
        this.height += this.padding * 2;
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Draw base and keys
        //this.drawCase(this.width, this.height)
        this.drawKeys(this.rows)


        this.texture = new THREE.Texture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter
        this.texture.needsUpdate = true;

        var material = new THREE.MeshBasicMaterial({map: this.texture});
        material.transparent = true;
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), material);
        mesh.position.set(0, 0, 0);
        this.add(mesh);

    }


    this.getInput=function(pointerX, pointerY)
    {
        var mouse3D = new THREE.Vector3(( pointerX / window.innerWidth ) * 2 - 1, -( pointerY / window.innerHeight ) * 2 + 1, 0);
        this.raycaster.setFromCamera(mouse3D, this.camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0 && intersects[0].object.parent instanceof VRKeyboard) {
            var point3D = new THREE.Vector3(intersects[0].point.x + (this.width / 2), Math.abs(intersects[0].point.y - (this.height / 2)), intersects[0].point.z)
            for (var key in this.keys) {

                if(this.keys.hasOwnProperty(key))
                    if (this.keys[key].collides(point3D))
                        return this.keys[key];
            }
        }
        return null;
    }


    this.drawKeys=function (rows) {
        for (var row in rows) {
            if(rows.hasOwnProperty(row))
            {
                var offsetX = (this.width - this.rows[row].width) / 2;
                for (var key in rows[row].keys) {
                    if(rows[row].keys.hasOwnProperty(key)) {
                        rows[row].keys[key].x += offsetX;
                        rows[row].keys[key].y += this.padding;
                        this.drawKey(rows[row].keys[key])
                        this.keys.push(rows[row].keys[key])
                    }
                }
            }
        }
    }



    this.drawCase = function (width, height) {

        this.context.beginPath();
        this.context.rect(0, 0, width, height);
        this.context.fillStyle = "rgba(255,0,0,0.4)";
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'red';
        this.context.stroke();
    }

    this.setStyle=function () {

    }

    this.drawKey = function (key) {

        this.context.clearRect(key.x-2, key.y-2, key.width+4, key.height+4);

        if(key.hasInput)
        {
            this.context.strokeStyle = this.borderOverColor
            this.context.fillStyle = this.keyOverColor;
            this.context.beginPath();
            this.context.roundRect(key.x, key.y, key.width, key.height, this.borderRadius);
            this.context.fill();
            this.context.stroke();
            this.context.textAlign = "center";
            this.context.font = "Normal 18px Arial";
            this.context.fillStyle = this.labelOverColor;
            this.context.fillText(key.code, key.x + key.width / 2, key.y + key.height / 2 + 4);

        }
        else
        {
            this.context.strokeStyle = this.borderColor;
            this.context.fillStyle =  this.keyColor;
            this.context.beginPath();
            this.context.roundRect(key.x, key.y, key.width, key.height, this.borderRadius);
            this.context.fill();
            this.context.stroke();
            this.context.textAlign = "center";
            this.context.font = "Normal 18px Arial";
            this.context.fillStyle = this.labelColor;
            this.context.fillText(key.code, key.x + key.width / 2, key.y + key.height / 2 + 4);

        }
    }

    this.onKeyDown=function(key)
    {
        switch (key.code) {
            case '?123':
                this.build(KeyBoardTypes.NUMERIC);
                break;

            case '123':
                this.build(KeyBoardTypes.NUMERIC);
                break;

            case '#+=':
                this.build(KeyBoardTypes.NUMERIC_ALT);
                break;

            case 'ABC':
                this.build(KeyBoardTypes.ALPHABETS_LOWER);
                break;

            //TAB
            case Unicode.TAB:
                this.build(KeyBoardTypes.NUMERIC_ALT);
                break;

            //Shift
            case Unicode.SHIFT:
                this.build(this.currentType == KeyBoardTypes.ALPHABETS_LOWER ? KeyBoardTypes.ALPHABETS_UPPER : KeyBoardTypes.ALPHABETS_LOWER);
                break;

            default:
                //console.log(key.code);
                this.updateText(key);
                this.dispatchEvent({type: 'keydown', code: key.code});

        }

    }

    this.onKeyOver=function(key)
    {
        if(key.hasInput)
            return;
        key.hasInput=true;
        this.dispatchEvent({type: 'keyover', code: key.code});
        this.drawKey(key)
    }

    this.onKeyOut=function(key)
    {
        if(!key.hasInput)
            return;
        key.hasInput=false;
        this.dispatchEvent({type: 'keyout', code: key.code});
        this.drawKey(key)
    }

    this.onKeyUp=function(key)
    {
        this.dispatchEvent({type: 'keyup', code: key.code});
    }


    this.updateText=function(key)
    {
        switch(key.code)
        {
            case Unicode.DELETE: //del
            {
                this.referenceText = this.referenceText.substr(0, this.referenceText.length - 1);
                break;
            }

            case Unicode.ENTER:
                this.referenceText  += '\n';
                //hide();
                //dispatchEvent(new KeyBoardEvent(KeyBoardEvent.ENTER));
                return;
                break;

            case Unicode.TAB:
                //this.referenceText  += '\t';
                break;

            case  Unicode.SPACE:
                this.referenceText  += ' ';
                break;

            default :
                this.referenceText  += key.code;
                break;

        }

        if(this.target!=null)
        {
            this.target.focus();
            this.target.value=this.referenceText;
        }
        this.dispatchEvent({type: 'update', code:key.code});
    }

    this.register=function(field)
    {
        var self=this;
        field.addEventListener("mousedown", function (e) {
            self.target=field;
        })

        field.addEventListener("mousedownoutside", function (e) {

            var mouse3D = new THREE.Vector3(( self.pointerX / window.innerWidth ) * 2 - 1, -( self.pointerY / window.innerHeight ) * 2 + 1, 0);
            self.raycaster.setFromCamera(mouse3D, self.camera);
            var intersects = self.raycaster.intersectObjects(self.scene.children, true);
            if (intersects.length > 0 && intersects[0].object.parent instanceof VRKeyboard) {
                return; //keyboard was clicked do nothing

            }
            if(field===self.target)
                self.target=null

        })
        this.fields.push(field);
    }

    this.hexToRGB=function (hex){
        var r = hex >> 16;
        var g = hex >> 8 & 0xFF;
        var b = hex & 0xFF;
        return [r,g,b];
    }

    this.update=function()
    {
        this.texture.needsUpdate = true;
        for (var k in this.keys) {
            if(this.keys.hasOwnProperty(k))
            {
                if (this.keys[k]==this.getInput(this.pointerX, this.pointerY))
                    this.onKeyOver(this.keys[k])
                else
                    this.onKeyOut(this.keys[k])
            }
        }
        for (var i in this.fields)
        {
            this.fields[i].update();
        }
    }
    this.init()
}


VRKeyboard.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRKeyboard,
});


VRTextInput = function (scene, camera, name) {

    THREE.Group.apply(this);

    this.camera = camera;
    this.scene = scene;
    this.raycaster = new THREE.Raycaster();
    this.pointerX=0;
    this.pointerY=0;

    this.name=name;


    //styling
    this._backgroundColor='#666666';
    Object.defineProperty(VRTextInput.prototype, 'backgroundColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._backgroundColor },
        set: function(value) {
            this._backgroundColor=value
            this.draw()

        }
    });

    this._textColor='#99FF33';
    Object.defineProperty(VRTextInput.prototype, 'textColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._textColor },
        set: function(value) {
            this._textColor=value
            this.draw()

        }
    });

    this._backgroundFocusColor='#333333';
    Object.defineProperty(VRTextInput.prototype, 'backgroundFocusColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._backgroundFocusColor },
        set: function(value) {
            this._backgroundFocusColor=value
            this.draw()

        }
    });

    this._textFocusColor='#99FF33';
    Object.defineProperty(VRTextInput.prototype, 'textFocusColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._textFocusColor },
        set: function(value) {
            this._textFocusColor=value
            this.draw()

        }
    });

    this._borderColor='#333333';
    Object.defineProperty(VRTextInput.prototype, 'borderColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderColor },
        set: function(value) {
            this._borderColor=value
            this.draw()

        }
    });


    this._borderFocusColor='#99FF33';
    Object.defineProperty(VRTextInput.prototype, 'borderFocusColor', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderFocusColor },
        set: function(value) {
            this._borderFocusColor=value
            this.draw()

        }
    });

    this._borderRadius=26;
    Object.defineProperty(VRTextInput.prototype, 'borderRadius', {
        enumerable: true,
        configurable: true,
        get: function() { return this._borderRadius },
        set: function(value) {
            this._borderRadius=value;
            this.draw()

        }
    });

    this._value="";

    Object.defineProperty(VRTextInput.prototype, 'value', {
        enumerable: true,
        configurable: true,
        get: function() { return this._value },
        set: function(value) {
            this._value=value;
            this.draw()
        }
    });

    this._displayAsPassword=false;

    Object.defineProperty(VRTextInput.prototype, 'displayAsPassword', {
        enumerable: true,
        configurable: true,
        get: function() { return this._displayAsPassword },
        set: function(value) {
            this._displayAsPassword=value;
            this.draw()
        }
    });

    this._width=400; //default

    Object.defineProperty(VRTextInput.prototype, 'width', {
        enumerable: true,
        configurable: true,
        get: function() { return this._width },
        set: function(value) {
            this._width=value;
            this.build()
        }
    });

    this.collides=function(pointerX, pointerY)
    {
        var mouse3D = new THREE.Vector3(( pointerX / window.innerWidth ) * 2 - 1, -( pointerY / window.innerHeight ) * 2 + 1, 0);
        this.raycaster.setFromCamera(mouse3D, this.camera);
        var intersects = this.raycaster.intersectObjects(this.scene.children, true);
        if (intersects.length > 0 && intersects[0].object.parent ==this) {
            return true;
        }
        return false;
    }

    this.clear = function ()
    {
        this.context.clearRect(0,0, this.width, this.height)
    }

    this.init=function()
    {

        var self = this;
        this.padding = 20;
        this.hasFocus=false;


        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');


        document.addEventListener('mousedown', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;
            if(self.collides(self.pointerX, self.pointerY))
            {
                self.dispatchEvent({type:"mousedown"})
            }
            else
            {
                self.dispatchEvent({type:"mousedownoutside"})
            }
        }, true);
        document.addEventListener('mousemove', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;

        }, false);

        document.addEventListener('mouseup', function (event) {
            self.pointerX=event.clientX;
            self.pointerY=event.clientY;
        }, false);

        this.build();
    }

    this.draw = function () {

        clearInterval(this.blink);
        this.clear();

        this.context.beginPath();

        this.context.roundRect(1, 1, this.width-2, this.height-2, this.borderRadius);

        this.context.fillStyle = this.hasFocus?this.backgroundFocusColor:this.backgroundColor;
        this.context.fill();


        this.context.textAlign = "left";
        this.context.font = "Normal 18px Arial";
        this.context.fillStyle = this.hasFocus?this.textFocusColor:this.textColor;

        var text=""
        var offset=0;

        if(this.hasFocus)
        {
            if(this.displayAsPassword)
                for(var i=0;i<this.value.length;i++)
                    text+="*";
            else
                text=this.value;
            var self=this;
            this.blink=setInterval(function() {
                self.cursor=!self.cursor;
                self.draw();
            }, 500);
            var metrics = this.context.measureText(text+"|");
            this.cursor? text=text+"|": text;
            var textWidth = metrics.width;

            if(textWidth>this.width-this.padding*2)
                offset=textWidth-(this.width-this.padding*2)

        }
        else //no focus
        {
            if(this.displayAsPassword)
                for(var i=0;i<this.value.length;i++)
                    text+="*";
            else
                text=this.value;
        }

        this.context.fillText(text, this.padding-offset, this.height/2+6);

        //clipping mask

        this.context.beginPath();
        this.context.rect(1, 20, this.padding-1, 24);
        this.context.rect(this.width-1-this.padding, 20, this.padding-1, 24);
        this.context.fillStyle = this.hasFocus?this.backgroundFocusColor:this.backgroundColor;
        this.context.fill();

        this.context.lineWidth = 2;
        this.context.strokeStyle = this.hasFocus?this.borderFocusColor:this.borderColor
        this.context.fillStyle = "rgba(255,0,0,0)";

        this.context.roundRect(1, 1, this.width-2, this.height-2, this.borderRadius);

        this.context.stroke();
        this.context.fill();

    }


    this.build=function()
    {
        for( var i = this.children.length - 1; i >= 0; i--) {
            this.children[i].geometry.dispose();
            this.children[i].material.dispose()
            this.remove(this.children[i])
        }

        this.canvas.width=this.width;
        this.canvas.height=this.height=60;
        this.draw();

        this.texture = new THREE.Texture(this.canvas);
        this.texture.minFilter = THREE.LinearFilter;
        this.texture.needsUpdate = true;

        var material = new THREE.MeshBasicMaterial({map: this.texture});
        material.transparent = true;
        var mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.canvas.width, this.canvas.height), material);
        mesh.position.set(0, 0, 0);
        this.add(mesh);
    }

    this.blur=function()
    {
        this.hasFocus=false;
        this.draw()
    }

    this.focus=function()
    {
        this.hasFocus=true;
        this.draw()
    }


    this.update=function()
    {
        this.texture.needsUpdate = true;
    }


    this.init();

}

VRTextInput.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRTextInput
});


CanvasRenderingContext2D.prototype.roundRect =function(x, y, w, h, r)
{
    this.beginPath();
    this.moveTo(x+r, y);
    this.lineTo(x+w-r, y);
    this.quadraticCurveTo(x+w, y, x+w, y+r);
    this.lineTo(x+w, y+h-r);
    this.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    this.lineTo(x+r, y+h);
    this.quadraticCurveTo(x, y+h, x, y+h-r);
    this.lineTo(x, y+r);
    this.quadraticCurveTo(x, y, x+r, y);
    this.fill();
}


/*
 https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
 */