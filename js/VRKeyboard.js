
VRKey = function (keyboard, code, type) {
    THREE.Group.apply(this)
    this.code = code

    var self = this;

    var element = document.createElement('div');
    element.addEventListener("click", function ()
    {
        self.dispatchEvent({type: 'click', code: self.code});
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
    this.currentType = KeyBoardTypes.ALPHABETS_LOWER //KeyBoardTypes.ALPHABETS_LOWER

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


    this.config = function ()
    {
        this.currentType = KeyBoardTypes.ALPHABETS_LOWER;
        this.layouts = {}
        this.layouts[KeyBoardTypes.NUMBER_PAD] = number_pad;
        this.layouts[KeyBoardTypes.NUMERIC] = numeric;
        this.layouts[KeyBoardTypes.NUMERIC_ALT] = numeric_alt;
        this.layouts[KeyBoardTypes.ALPHABETS_LOWER] = alphabets_lower;
        this.layouts[KeyBoardTypes.ALPHABETS_UPPER] = alphabets_upper;
    }

//http://javascriptplayground.com/blog/2013/12/es5-getters-setters/

    this.setTarget=function(field)
    {
        this.target=field;
        this.referenceText=this.target.getAttribute("value")
        this.target.focus()
        this.target.setSelectionRange(this.referenceText.length, this.referenceText.length)

        console.log(this.target.getAttribute("value"))

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


    this.handleClick = function (key) {

        switch (key) {
            case '?123':
            {
                this.build(KeyBoardTypes.NUMERIC);
            }
                break;

            case '123':
            {
                this.build(KeyBoardTypes.NUMERIC);
            }
                break;

            case '#+=':
            {
                this.build(KeyBoardTypes.NUMERIC_ALT);
            }
                break;

            case 'ABC':
            {
                this.build(KeyBoardTypes.ALPHABETS_LOWER);
            }
                break;

            //TAB
            case Unicode.TAB:
            {
                this.build(KeyBoardTypes.NUMERIC_ALT);
            }
                break;

            //Shift
            case Unicode.SHIFT:
            {
                this.build(this.currentType == KeyBoardTypes.ALPHABETS_LOWER ? KeyBoardTypes.ALPHABETS_UPPER : KeyBoardTypes.ALPHABETS_LOWER);
            }
                break;

            default:
            {

                this.update(key)
                //dispatchEvent(new KeyBoardEvent(KeyBoardEvent.UPDATE, kid));
            }
                break;
        }
    }

    this.update=function(key)
    {

        switch(key)
        {
            case Unicode.DELETE: //del
            {
                this.referenceText = this.referenceText.substr(0, this.referenceText.length - 1);
                break;
            }


            case Unicode.ENTER:
            {
                this.referenceText  += '\n';
                //hide();
                //dispatchEvent(new KeyBoardEvent(KeyBoardEvent.ENTER));
                return;
                break;
            }

            case Unicode.TAB:
            {
                //this.referenceText  += '\t';
                break;
            }

            case  Unicode.SPACE:
            {
                this.referenceText  += ' ';
                break;
            }

            default :
            {
                this.referenceText  += key;
                break;
            }

        }

        if(this.target!=null)
        {
            this.target.focus();
            this.target.setAttribute("value", this.referenceText);
            this.target.setSelectionRange(this.referenceText.length, this.referenceText.length);
            this.target.scrollLeft=this.target.scrollWidth;
            console.log(this.target.size)
        }

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


    this.build = function (param)
    {

        var self = this;
        this.clear()

        if (param != null)
            this.currentType = param;

        this.currentLayout = this.layouts[this.currentType]; //array

        //Background Pad
        var bg = document.createElement('div');
        bg.style.width = '800px'; //TODO
        bg.style.height = '340px';
        bg.className='keyboardBg'

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

                var ko = this.currentLayout[rows][columns]; //key object
                var key = new VRKey(this, ko.c, ko.type);

                key.addEventListener('click', function (e) {
                    self.handleClick(e.code)
                })

                xPos += (key.style.width / 2) //offset
                key.position.set(xPos, yPos, this.depth);   //added depth //TODO
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

    this.config();
    this.build();

}


VRKeyboard.prototype = Object.assign(Object.create(THREE.Group.prototype), {
    constructor: VRKeyboard,
});




