var log = console.log;
var svg = document.querySelector('svg');

var line = "M36,38 Q188,177 138,104 T399,74";
log(line);



class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.draw()
    }

    draw(){
        var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        c.setAttribute('cx', this.x);
        c.setAttribute('cy', this.y);
        c.setAttribute('r', 5);
        c.setAttribute('fill-opacity', 1);
        c.setAttribute('fill', this.color);
        c.setAttribute('stroke-width', 2);

        svg.prepend(c);
    }
}


class Line {
    constructor(M, Q1, Q2, T) {
        this.M = M; // Point
        this.Q1 = Q1;
        this.Q2 = Q2;
        this.T = T;
    }
}


class SVG {

    lineArray = [];
    color = '#eff';
    width = 600;
    height = 600;

    constructor(t0, t1, pointsCount =20) {
        this.t0 = t0;//Point
        this.t1 = t1;//Point
        this.pointsCount = pointsCount;
    }

    setFrame(width, height){
        this.width = width;
        this.height = height;
    }

    setContainer(containerID){
        this.containerID = containerID;
    }

    generateDots() {
        var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");


        c1.setAttribute('cx', this.t0.x);
        c1.setAttribute('cy', this.t0.y);
        c1.setAttribute('r', 5);
        c1.setAttribute('fill-opacity', 0);

        c2.setAttribute('cx', this.t1.x);
        c2.setAttribute('cy', this.t1.y);
        c2.setAttribute('r', 5);
        c2.setAttribute('fill-opacity', 0);


        // c1.setAttribute('circle', `cx="${this.t0.x}" cy="${this.t0.y}" r="10"`);
        // c2.setAttribute('circle', `cx="${this.t1.x}" cy="${this.t1.y}" r="10"` );
        this.containerID.prepend(c1);
        this.containerID.prepend(c2);
    }

    generate() {
        var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.path = p;
        // p.createAttribute('ddd');
        p.setAttribute('d', '');

        var start = this.t0;
        var end = this.t1;

        var string = `M${start.x},${start.y} `;

        for (var i = 0; i <this.pointsCount; i++) {
            var q = this.getRandPoint('');
            var m = this.getRandPoint('');
            var t = this.getRandPoint();
            string += ` Q${q.x},${q.y} ${m.x},${m.y} T${t.x},${t.y} `;
            // string += `${q.x},${q.y} A${m.x},${m.y} `
        }



        p.setAttribute('d', string);
        p.setAttribute('stroke', "url(#grad1)");
        log(this.path);
    }

    pushLine() {
        this.containerID.prepend(this.path);
    }

    getRandPoint(color ='') {
        var max = 5;
        var min = 1;
        // var x = Math.floor(Math.random() * (max - min) + min);
        // var y = Math.floor(Math.random() * (max - min) + min);


        var x = Math.floor(min + Math.random() * (max + 1 - min)) * 100;
        var y = Math.floor(min + Math.random() * (max + 1 - min)) * 100;

        return new Point(x, y, color);
    }

}

var p = new SVG(new Point(20, 20), new Point(580, 580));
p.setContainer(svg);
p.generate();
// p.generateDots();
p.pushLine();

var path = document.querySelector('path');
var length = path.getTotalLength();
svg.style.cssText =`stroke-dasharray: ${length};stroke-dashoffset: ${length};`;
svg.setAttributeNS(null, 'width', '100%');
svg.setAttributeNS(null, 'height', '100%');
