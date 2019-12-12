var log = console.log;
var svg = document.querySelector('svg');

var line = "M36,38 Q188,177 138,104 T399,74";
log(line);


class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
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
    width = 500;
    height = 500;

    constructor(t0, t1, pointsCount = 5) {
        this.t0 = t0;//Point
        this.t1 = t1;//Point
        this.pointsCount = pointsCount;
    }

    setFrame(width, height) {
        this.width = width;
        this.height = height;
    }

    setContainer(containerID) {
        this.containerID = containerID;
    }

    generateDots(){
        var c1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        var c2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");


        c1.setAttribute('cx', this.t0.x);
        c1.setAttribute('cy', this.t0.y);
        c1.setAttribute('r', 5);
        c1.setAttribute('fill-opacity', 1);

        c2.setAttribute('cx', this.t1.x);
        c2.setAttribute('cy', this.t1.y);
        c2.setAttribute('r', 5);
        c2.setAttribute('fill-opacity', 1);



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

        var string = `M${start.x},${start.y}`;



        for (var i = 0; i < this.pointsCount; i++) {
            var r = this.getRandPoint();
            var r2 = this.getRandPoint();
            string += ` S${r.x},${r.y} ${r2.x},${r2.y}`
        }

        string += ` S${r.x},${r.y} ${end.x},${end.y}`;


        p.setAttribute('d', string);
        log(this.path);
    }

    pushLine() {
        this.containerID.prepend(this.path);
    }

    getRandPoint(min = 0) {
        var x = Math.floor(Math.random() * (this.width - 50) + 50);
        var y = Math.floor(Math.random() * (this.height - 50) + 50);
        return new Point(x, y);
    }

}

var p = new SVG(new Point(20, 20), new Point(580, 580));
p.setContainer(svg);
p.generate();
p.pushLine();
p.generateDots();
