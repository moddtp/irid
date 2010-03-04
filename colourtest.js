module("Reading formats");

test("hexToRGB (6 digits)", function() {
    var rgb = Colour.hexToRGB("#0088ff");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("hexToRGB (8 digits)", function() {
    var rgb = Colour.hexToRGB("#0088ff7f");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a.toFixed(1), 0.5 );
});

test("hexToRGB (3 digits)", function() {
    var rgb = Colour.hexToRGB("#08f");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("hexToRGB (4 digits)", function() {
    var rgb = Colour.hexToRGB("#08f8");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a.toFixed(1), 0.5 );
});

test("simple rgb", function() {
    var rgb = Colour.cssRGBToRGB("rgb(0, 136, 255)");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("rgb with percent", function() {
    var rgb = Colour.cssRGBToRGB("rgb(0%, 50%, 100%)");
    equals( rgb.r, 0 );
    equals( rgb.g, 127 );
    equals( rgb.b, 255 );
    equals( rgb.a, undefined );
});

test("rgba", function() {
    var rgb = Colour.cssRGBToRGB("rgba(0, 136, 255, 0.7)");
    equals( rgb.r, 0 );
    equals( rgb.g, 136 );
    equals( rgb.b, 255 );
    equals( rgb.a, 0.7 );
});

test("hsl", function() {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%)");
    equals( hsl.h, 0.5 );
    equals( hsl.s, 0.6 );
    equals( hsl.l, 0.7 );
    equals( hsl.a, undefined );
});

test("hsla", function() {
    var hsl = Colour.cssHSLToHSL("hsl(180, 60%, 70%, 0.8)");
    equals( hsl.h, 0.5 );
    equals( hsl.s, 0.6 );
    equals( hsl.l, 0.7 );
    equals( hsl.a, 0.8 );
});


module("Writing formats");

test("rgbToCSSRGB", function() {
    equals( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255 }), "rgb(0, 136, 255)" );
});

test("rgbToCSSRGB with alpha", function() {
    equals( Colour.rgbToCSSRGB({r: 0, g: 136, b: 255, a: 0.7 }), "rgba(0, 136, 255, 0.70)" );
});

test("hslToCSSHSL", function() {
    equals( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7}), "hsl(180, 60%, 70%)" );
});

test("hslToCSSHSL with alpha", function() {
    equals( Colour.hslToCSSHSL({h: 0.5, s: 0.6, l: 0.7, a: 0.8}), "hsla(180, 60%, 70%, 0.80)" );
});

test("rgbToHex", function() {
    equals( Colour.rgbToHex({r: 0, g: 136, b: 255 }), "#0088ff" );
});

test("rgbToHex with alpha", function() {
    equals( Colour.rgbToHex({r: 0, g: 136, b: 255, a: 0.5 }), "#0088ff7f" );
});


module("Colour space conversion");

test("hslToRGB", function() {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255 })
    equals( rgb.r , 0 );
    equals( rgb.g , 138 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined );
});

test("hslToRGB with alpha", function() {
    var rgb = Colour.hslToRGB({ h: 147/255, s: 1, l: 128/255, a: 0.5 })
    equals( rgb.r , 0 );
    equals( rgb.g , 138 );
    equals( rgb.b , 255 );
    equals( rgb.a , 0.5 );
});

test("hslToRGB (white)", function() {
    var rgb = Colour.hslToRGB({ h: 0, s: 1, l: 1 })
    equals( rgb.r , 255 );
    equals( rgb.g , 255 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined ); 
});

test("hslToRGB (hue=1)", function() {
    var rgb = Colour.hslToRGB({ h: 1, s: 1, l: 0.5 })
    equals( rgb.r , 255 );
    equals( rgb.g , 0 );
    equals( rgb.b , 0 );
    equals( rgb.a , undefined ); 
});

test("hslToRGB (negative hue)", function() {
    var rgb = Colour.hslToRGB({ h: -0.25, s: 1, l: 0.5 })
    equals( rgb.r , 127 );
    equals( rgb.g , 0 );
    equals( rgb.b , 255 );
    equals( rgb.a , undefined ); 
});

test("rgbToHSL", function() {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255 })
    equals( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    equals( hsl.s.toFixed(2) , 1 );
    equals( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    equals( hsl.a , undefined );
});

test("rgbToHSL", function() {
    var hsl = Colour.rgbToHSL({ r: 0, g: 138, b: 255, a: 0.5 })
    equals( hsl.h.toFixed(2) , (147/255).toFixed(2) );
    equals( hsl.s.toFixed(2) , 1 );
    equals( hsl.l.toFixed(2) , (128/255).toFixed(2) );
    equals( hsl.a , 0.5 );
});

test("rgbToHSL (white)", function() {
    var hsl = Colour.rgbToHSL({ r: 255, g: 255, b: 255 })
    equals( hsl.h.toFixed(2) , 0 );
    equals( hsl.s.toFixed(2) , 0 );
    equals( hsl.l.toFixed(2) , 1 );
    equals( hsl.a , undefined );
});


module("Colour object");

test("colour from string (#fff)", function() {
    var colour = new Colour("#fff");
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 1 );
    equals( colour.a , undefined );
});

test("colour from string (#000)", function() {
    var colour = new Colour("#000");
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( colour.a , undefined );
});

test("colour from colour", function() {
    var colour = new Colour("#000");
    colour = new Colour(colour);
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( colour.a , undefined );
});

test("lighten", function() {
    var colour = new Colour("#000").lighten(0.5);
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0.5 );
    equals( colour.a , undefined );
    equals( colour.toHexString() , "#7f7f7f");
    colour = new Colour({h: 0, s: 0, l: 0.5}).lighten(0.5);
    equals( colour.l.toFixed(2) , 0.75 );
});

test("darken", function() {
    var colour = new Colour("#fff").darken(0.5);
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0.5 );
    equals( colour.a , undefined );
    equals( colour.toHexString() , "#7f7f7f");
});

test("invert", function() {
    var colour = new Colour("#fff").invert();
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    colour = new Colour("#000").invert();
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 1 );
    equals( new Colour("#f00").invert().toHexString(), "#00ffff");
    equals( new Colour("#0f0").invert().toHexString(), "#ff00ff");
    equals( new Colour("#00f").invert().toHexString(), "#ffff00");
    equals( new Colour("#ace").invert().toHexString(), "#553310");
});

test("complement", function() {
    var colour = new Colour("#fff").complement();
    equals( colour.h.toFixed(2) , 0.5 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 1 );
    colour = new Colour("#000").complement();
    equals( colour.h.toFixed(2) , 0.5 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( new Colour("#f00").complement().toHexString(), "#00ffff");
    equals( new Colour("#0f0").complement().toHexString(), "#ff00ff");
    equals( new Colour("#00f").complement().toHexString(), "#fffe00");
    equals( new Colour("#ace").complement().toHexString(), "#eeccaa");
});

test("desaturate", function() {
    var colour = new Colour("#fff").desaturate();
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 1 );
    colour = new Colour("#000").desaturate();
    equals( colour.h.toFixed(2) , 0 );
    equals( colour.s.toFixed(2) , 0 );
    equals( colour.l.toFixed(2) , 0 );
    equals( new Colour("#f00").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#0f0").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#00f").desaturate().toHexString(), "#7f7f7f");
    equals( new Colour("#ace").desaturate().toHexString(), "#cccccc");
});


test("Colour(undefined)", function () {
    var failed = false;
    expect(2);
    try {
        var colour = new Colour(undefined);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("RGB object", function () {
    var c = Colour({r: 255, g: 0, b:0});
    equals(c.h, 0);
    equals(c.s, 1);
    equals(c.l, 0.5);
});

test("Gibberish", function () {
    var failed = false;
    expect(2);
    try {
        var c = Colour("ThisIsDefinitelyNotTheNameOfAColour");
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("null", function () {
    var failed = false;
    expect(2);
    try {
        var c = Colour(null);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});

test("NaN", function () {
    var failed = false;
    expect(2);
    try {
        var c = Colour(NaN);
    }
    catch (e) {
        equals(e, "Invalid colour specification");
        failed = true;
    }
    finally {
        ok(failed, "An error was correctly raised");
    }
});


test("named colour", function() {
    var c = Colour("lightgoldenrodyellow");
    equals(c.h.toFixed(2), "0.17");
    equals(c.s.toFixed(2), "0.80");
    equals(c.l.toFixed(2), "0.90");
});

test("named colours are case insensitive", function() {
    var c = Colour("LightGoldenrodYellow");
    equals(c.h.toFixed(2), "0.17");
    equals(c.s.toFixed(2), "0.80");
    equals(c.l.toFixed(2), "0.90");
});


























