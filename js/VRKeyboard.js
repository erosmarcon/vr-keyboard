
VRKey = function (keyboard, code, type) {
    THREE.Group.apply(this)
    this.code = code

    var self = this;

    var element = document.createElement('div');
    element.addEventListener("click", function (e)
    {
        e.stopPropagation();
        self.dispatchEvent({type: 'click', code: self.code});
    })

    element.addEventListener("mouseup", function (e)
    {
        self.dispatchEvent({type: 'mouseup', code: self.code});
    })

    element.addEventListener("mousedown", function (e)
    {
        self.dispatchEvent({type: 'mousedown', code: self.code});
    })

    element.addEventListener("mouseleave", function (e)
    {
        self.dispatchEvent({type: 'mouseleave', code: self.code});
    })


    element.addEventListener("mouseover", function ()
    {
        this.style.boxShadow="0px 0px 12px rgba(0,255,255,0.75)";
        this.style.border="1px solid rgba(127,255,255,0.75)";
    })

    element.addEventListener("mouseout", function ()
    {
        this.style.boxShadow="0px 0px 12px rgba(0,255,255,0.5)";
        this.style.border="1px solid rgba(127,255,255,0.25)";
    })

    this.style=keyboard.getKeyStyle(type)
    
    element.style.width = this.style.width+ 'px';
    element.style.height = this.style.height + 'px';
    element.style.boxShadow="0px 0px 12px rgba(0,255,255,0.5)";
    element.style.border="1px solid rgba(127,255,255,0.25)";
    element.style.textAlign="center";
    element.style.cursor="default";
    element.style.backgroundColor = 'rgba(0,127,127,0.5)';


    var label = document.createElement('div');
    label.style.fontFamily="Helvetica, sans-serif";
    label.style.position="absolute";
    label.style.top="18px";
    label.style.left="0px";
    label.style.right="0px";
    label.style.fontSize="20px";
    label.style.fontWeight="normal";
    label.style.color="rgba(255,255,255,0.75)";
    label.style.textShadow="0 0 10px rgba(0,255,255,0.95)";

    label.textContent = code;
    element.appendChild(label);

    this.clear = function ()
    {
        this.remove(this.CSS3Dobject);
    }


    this.CSS3Dobject = new THREE.CSS3DObject(element);
    this.add(this.CSS3Dobject);

}

VRKey.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRKey
});


VRKeyboard = function () {

    THREE.Group.apply(this)

    const Unicode=
    {
        DELETE:'\u232B',
        ENTER:'\u23CE',
        SHIFT:'\u21E7',
        SPACE:'\u2423',
        TAB:'\u21E5'
    }

    const KeyBoardTypes =
    {
        NUMBER_PAD: "number_pad",
        NUMERIC: "numeric",
        NUMERIC_ALT: "numeric_alt",
        ALPHABETS_LOWER: "alphabets_lower",
        ALPHABETS_UPPER: "alphabets_upper"
    }

    this.target=null //private
    this.referenceText=""
    this.depth = 5 //?
    this.padding=20;
    this.spacing = 10;
    this.layouts = {};
    this.currentType = KeyBoardTypes.ALPHABETS_LOWER
    this.fields=[];

    var numeric =
        [
            [
                {c: '1', type:'standard'},
                {c: '2', type:'standard'},
                {c: '3', type:'standard'},
                {c: '4', type:'standard'},
                {c: '5', type:'standard'},
                {c: '6', type:'standard'},
                {c: '7', type:'standard'},
                {c: '8', type:'standard'},
                {c: '9', type:'standard'},
                {c: '0', type:'standard'}
            ],
            [
                {c: '@', type:'standard'},
                {c: '#', type:'standard'},
                {c: '$', type:'standard'},
                {c: '%', type:'standard'},
                {c: '*', type:'standard'},
                {c: '-', type:'standard'},
                {c: '+', type:'standard'},
                {c: '(', type:'standard'},
                {c: ')', type:'standard'}
            ],
            [
                {c: '#+=', type:'alt'},
                {c: '!', type:'standard'},
                {c: '"', type:'standard'},
                {c: "'", type:'standard'},
                {c: ':', type:'standard'},
                {c: ';', type:'standard'},
                {c: ',', type:'standard'},
                {c: '?', type:'standard'},
                {c: Unicode.DELETE, type:'delete'}
            ],
            [
                {c: 'ABC', type:'abc'},
                {c: '/', type:'standard'},
                {c: Unicode.SPACE, type:'space'},
                {c: '.', type:'standard'},
                {c: Unicode.ENTER, type:'enter'}
            ]
        ];

    var number_pad =
        [
            [
                {c: '1',type:'num'},
                {c: '2',type:'num'},
                {c: '3',type:'num'}
            ],
            [
                {c: '4',type:'num'},
                {c: '5',type:'num'},
                {c: '6',type:'num'}
            ],
            [
                {c: '7',type:'num'},
                {c: '8',type:'num'},
                {c: '9',type:'num'}
            ],
            [
                {c: '*',type:'num'},
                {c: '0',type:'num'},
                {c: '#',type:'num'}
            ],
            [
                {c: Unicode.DELETE, type:'delete'},
                {c: Unicode.ENTER, type:'enter'}
            ]
        ];

    var numeric_alt =
        [
            [
                {c: '~', type:'standard'},
                {c: '`', type:'standard'},
                {c: '|', type:'standard'},
                {c: '•', type:'standard'},
                {c: '√', type:'standard'},
                {c: 'π', type:'standard'},
                {c: '÷', type:'standard'},
                {c: 'x', type:'standard'},
                {c: '{', type:'standard'},
                {c: '}', type:'standard'}
            ],
            [
                
                {c: '₤', type:'standard'},
                {c: '#', type:'standard'},
                {c: '€', type:'standard'},
                {c: '°', type:'standard'},
                {c: '^', type:'standard'},
                {c: '_', type:'standard'},
                {c: '=', type:'standard'},
                {c: '[', type:'standard'},
                {c: ']', type:'standard'}
            ],
            [
                {c: '123', type:'alt'},
                {c: '™', type:'standard'},
                {c: '®', type:'standard'},
                {c: "©", type:'standard'},
                {c: '¶', type:'standard'},
                {c: '\/', type:'standard'},
                {c: '<', type:'standard'},
                {c: '>', type:'standard'},
                {c: Unicode.DELETE, type:'delete'}
            ],
            [
                {c: 'ABC', type:'abc'},
                {c: ',', type:'standard'},
                {c: Unicode.SPACE, type:'space'},
                {c: '.', type:'standard'},
                {c: Unicode.ENTER, type:'enter'}
            ]
        ];

    var alphabets_lower =
        [
            [
                {c: 'q', type:'standard'},
                {c: 'w', type:'standard'},
                {c: 'e', type:'standard'},
                {c: 'r', type:'standard'},
                {c: 't', type:'standard'},
                {c: 'y', type:'standard'},
                {c: 'u', type:'standard'},
                {c: 'i', type:'standard'},
                {c: 'o', type:'standard'},
                {c: 'p', type:'standard'}
            ],
            [
                {c: 'a', type:'standard'},
                {c: 's', type:'standard'},
                {c: 'd', type:'standard'},
                {c: 'f', type:'standard'},
                {c: 'g', type:'standard'},
                {c: 'h', type:'standard'},
                {c: 'j', type:'standard'},
                {c: 'k', type:'standard'},
                {c: 'l', type:'standard'}
            ],
            [
                {c: Unicode.SHIFT, type:'shift'},
                {c: 'z', type:'standard'},
                {c: 'x', type:'standard'},
                {c: 'c', type:'standard'},
                {c: 'v', type:'standard'},
                {c: 'b', type:'standard'},
                {c: 'n', type:'standard'},
                {c: 'm', type:'standard'},
                {c: Unicode.DELETE, type:'delete'}
            ],
            [
                {c: '?123', type:'abc'},
                {c: '/', type:'standard'},
                {c: Unicode.SPACE, type:'space'},
                {c: '.', type:'standard'},
                {c: Unicode.ENTER, type:'enter'}
            ]
        ];

    var alphabets_upper =
        [
            [
                {c: 'Q', type:'standard'},
                {c: 'W', type:'standard'},
                {c: 'E', type:'standard'},
                {c: 'R', type:'standard'},
                {c: 'T', type:'standard'},
                {c: 'Y', type:'standard'},
                {c: 'U', type:'standard'},
                {c: 'I', type:'standard'},
                {c: 'O', type:'standard'},
                {c: 'P', type:'standard'}
            ],
            [
                {c: 'A', type:'standard'},
                {c: 'S', type:'standard'},
                {c: 'D', type:'standard'},
                {c: 'F', type:'standard'},
                {c: 'G', type:'standard'},
                {c: 'H', type:'standard'},
                {c: 'J', type:'standard'},
                {c: 'K', type:'standard'},
                {c: 'L', type:'standard'}
            ],
            [
                {c: Unicode.SHIFT, type:'shift'},
                {c: 'Z', type:'standard'},
                {c: 'X', type:'standard'},
                {c: 'C', type:'standard'},
                {c: 'V', type:'standard'},
                {c: 'B', type:'standard'},
                {c: 'N', type:'standard'},
                {c: 'M', type:'standard'},
                {c: Unicode.DELETE, type:'delete'}
            ],
            [
                {c: '?123', type:'abc'},
                {c: '/', type:'standard'},
                {c: Unicode.SPACE, type:'space'},
                {c: '.', type:'standard'},
                {c: Unicode.ENTER, type:'enter'}
            ]
        ];


    this.init = function ()
    {
        var self=this;
        window.addEventListener("click", function()
        {
            for (var i in self.fields)
            {
                self.fields[i].blur();
            }
            self.target=null;
        });
        this.currentType = KeyBoardTypes.ALPHABETS_LOWER;
        this.layouts = {}
        this.layouts[KeyBoardTypes.NUMBER_PAD] = number_pad;
        this.layouts[KeyBoardTypes.NUMERIC] = numeric;
        this.layouts[KeyBoardTypes.NUMERIC_ALT] = numeric_alt;
        this.layouts[KeyBoardTypes.ALPHABETS_LOWER] = alphabets_lower;
        this.layouts[KeyBoardTypes.ALPHABETS_UPPER] = alphabets_upper;
        this.build();
    }

//http://javascriptplayground.com/blog/2013/12/es5-getters-setters/

    this.setTarget=function(field)
    {
        for (var i in this.fields)
        {
            this.fields[i].blur();
        }

        this.target=field;
        this.referenceText=this.target.input.getAttribute("value")

        this.target.focus()
        this.target.input.setSelectionRange(this.referenceText.length, this.referenceText.length)

    }

    this.getKeyStyle=function(type)
    {
        var style={}
        switch(type)
        {
            case 'standard':
                style.width=70;
                style.height=60;
                break;
                
            case 'delete':
                style.width=80;
                style.height=60;
                break;

            case 'space':
                style.width=315;
                style.height=60;
                break;

            case 'enter':
                style.width=150;
                style.height=60;
                break;

            case 'shift':
                style.width=80;
                style.height=60;
                break;

            case 'alt':
                style.width=80;
                style.height=60;
                break;

            case 'tab':
                style.width=80;
                style.height=60;
                break;

            case 'abc':
                style.width=100;
                style.height=60;
                break;

            case 'shift':
                style.width=80;
                style.height=60;
                break;

            case 'num':
                style.width=100;
                style.height=50;
                break;

            default:
                style.width=70;
                style.height=60;
        }
        return style;
    }


    //do something to register every text field and use a typed class


    this.handleClick = function (code) {

        switch (code) {
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
                this.update(code);
                //dispatchEvent(new KeyBoardEvent(KeyBoardEvent.UPDATE, code));


        }
    }

    this.update=function(code)
    {
        switch(code)
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
                this.referenceText  += code;
                break;

        }

        if(this.target!=null)
        {
            this.target.focus();
            this.target.input.setAttribute("value", this.referenceText);
            this.target.input.setSelectionRange(this.referenceText.length, this.referenceText.length);
            this.target.input.scrollLeft=this.target.input.scrollWidth;
        }
        this.dispatchEvent({type: 'update', code:code});

    }


    this.clear=function()
    {
        if (this.keyholder)
        {
            this.keyholder.traverse(function (child)
            {
                if (child instanceof VRKey)
                    child.clear();
            });
        }
        if(this.background)
            this.remove(this.background);
    }


    this.build = function (layout)
    {

        var self = this;
        this.clear()

        if (layout != null)
            this.currentType = layout;

        this.currentLayout = this.layouts[this.currentType]; //array

        //Background Pad
        var bg = document.createElement('div');

        bg.style.boxShadow="0px 0px 12px rgba(0,255,255,0.5)";
        bg.style.border="1px solid rgba(127,255,255,0.2)";
        bg.style.cursor="default";
        bg.addEventListener("click", function (e)
        {
            e.stopPropagation();
        })
        this.background= new THREE.CSS3DObject(bg);

        this.add(this.background);

        //Keyholder

        this.keyholder = new THREE.Group();


        var xPos = 0;
        var yPos = 0;
        var H=0 // Keyholder computed total Height
        var W=0 // Keyholder computed total Width


        for (var rows = 0; rows < this.currentLayout.length; rows++) {
            var row = new THREE.Group()
            var rW = 0; // Single row total Width

            for (var columns = 0; columns < this.currentLayout[rows].length; columns++) {

                var keyData = this.currentLayout[rows][columns]; //key object
                var key = new VRKey(this, keyData.c, keyData.type);

                key.addEventListener('click', function (e) {

                    self.handleClick(e.code)

                })

                key.addEventListener('mousedown', function (e) {
                    this.scale.set(0.98,0.98,0.98)
                })

                key.addEventListener('mouseup', function (e) {
                    this.scale.set(1,1,1)
                })

                key.addEventListener('mouseleave', function (e) {
                    this.scale.set(1,1,1)
                })

                xPos += (key.style.width / 2)
                key.position.set(xPos, yPos, this.depth);
                row.add(key);
                xPos += (key.style.width / 2) + this.spacing;
                rW = xPos-this.spacing;
                if(rW>W)
                    W=rW
            }

            xPos = 0;
            yPos -= (key.style.height + this.spacing);
            H+=(key.style.height + this.spacing);
            row.position.set(-rW / 2, 0, 0)
            this.keyholder.add(row);
        }

        bg.style.height =   H+(this.padding*2)+'px';
        bg.style.width  =   W+(this.padding*2)+'px';
        H -= (key.style.height + this.spacing);
        this.keyholder.position.set(0, H/2, 0);
        this.add(this.keyholder);


    }

    this.register=function(field)
    {
        var self=this;
        field.addEventListener("click", function (e) {
            e.stopPropagation();
            self.setTarget(field);


        })
        this.fields.push(field);
    }

    this.init();
}


VRKeyboard.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRKeyboard,
});


VRTextInput = function (name) {

    THREE.Group.apply(this);

    this.input = document.createElement("input");
    this.input.setAttribute("type", "text");
    this.input.setAttribute('name',name);
    this.input.setAttribute('placeholder',name);
    this.input.setAttribute('value',"");

    //
    this.input.style.fontFamily="Helvetica, sans-serif";
    this.input.style.position="absolute";
    this.input.style.top="18px";
    this.input.style.left="0px";
    this.input.style.right="0px";
    this.input.style.fontSize="20px";
    this.input.style.fontWeight="normal";
    this.input.style.color="rgba(255,255,255,0.75)";
    this.input.style.textShadow="0 0 10px rgba(0,255,255,0.95)";
    this.input.style.backgroundColor="rgba(0,127,127,0.5)";
    this.input.style.color= "#FFFFFF";
    this.input.style.boxShadow="0px 0px 12px rgba(0,255,255,0.5)";
    this.input.style.border="1px solid rgba(127,255,255,0.2)";
    this.input.style.padding="20px";

    this.addEventListener=function(event, listener)
    {
        this.input.addEventListener(event, listener)
    }

    this.focus=function()
    {
        this.input.focus()
        this.input.style.boxShadow="0px 0px 12px rgba(0,255,255,0.75)";
        this.input.style.border="1px solid rgba(127,255,255,0.75)";

    }

    this.blur=function()
    {
        this.input.blur()
        this.input.style.boxShadow="0px 0px 12px rgba(0,255,255,0.5)";
        this.input.style.border="1px solid rgba(127,255,255,0.2)";
    }



    this.input.addEventListener("keydown", function (e) {

        e.preventDefault()

    })



    this.displayAsPassword=function(value)
    {
        if(value)
            this.input.setAttribute("type", "password");
        else
            this.input.setAttribute("type", "text");
    }



    this.CSS3Dobject = new THREE.CSS3DObject(this.input);
    this.add(this.CSS3Dobject);




}

VRTextInput.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRTextInput
});




