var canvasEl = document.getElementById("canvas");
configure(canvasEl);
resize(800, 400);
noArrowScroll();
strokeCap(ROUND);

var Camera = new Vector3(0, 0, 800);

/*var points = [];
var triangles = [];

for(var i = 0; i < 14; i++) {
  points.push(new Vector3( 100,  100, -150 + i * 10));
  points.push(new Vector3( 100, -100, -150 + i * 10));
  points.push(new Vector3(-100,    0, -150 + i * 10));
  
  triangles.push([i * 3, i * 3 + 1, i * 3 + 2, { r: 255 * i/30, g: 0, b: 255 - 255 * i/30, a:255 }]);
}*/

/*var points = [];
var triangles = [];
var a = new Vector3(   0,   50,  -50);
var b = new Vector3(   0,   50,   50);
var c = new Vector3(   0,  100,  -50);
var d = new Vector3(   0,  100,   50);

for(var i = 0; i < 36; i++) {
  points.push(a.get());
  points.push(b.get());
  points.push(c.get());
  points.push(d.get());
  a.rotateZ(3.14159 * 2/36);
  b.rotateZ(3.14159 * 2/36);
  c.rotateZ(3.14159 * 2/36);
  d.rotateZ(3.14159 * 2/36);
}
for(var i = 0; i < 36; i++) {
  var segmentColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255, a: 255};
  triangles.push([(i * 4 + 0) % 144, (i * 4 + 2) % 144, (i * 4 + 4) % 144, segmentColor]);
  triangles.push([(i * 4 + 2) % 144, (i * 4 + 4) % 144, (i * 4 + 6) % 144, segmentColor]);
  triangles.push([(i * 4 + 2) % 144, (i * 4 + 3) % 144, (i * 4 + 7) % 144, segmentColor]);
  triangles.push([(i * 4 + 3) % 144, (i * 4 + 7) % 144, (i * 4 + 6) % 144, segmentColor]);
  triangles.push([(i * 4 + 1) % 144, (i * 4 + 3) % 144, (i * 4 + 5) % 144, segmentColor]);
  triangles.push([(i * 4 + 3) % 144, (i * 4 + 5) % 144, (i * 4 + 7) % 144, segmentColor]);
  triangles.push([(i * 4 + 0) % 144, (i * 4 + 1) % 144, (i * 4 + 4) % 144, segmentColor]);
  triangles.push([(i * 4 + 1) % 144, (i * 4 + 4) % 144, (i * 4 + 5) % 144, segmentColor]);
}*/

var points = [];
var triangles = [];
var a = new Vector3(   0,   50,  -50);
var b = new Vector3(   0,   50,   50);
var c = new Vector3(   0,  100,  -50);
var d = new Vector3(   0,  100,   50);

for(var i = 0; i < 36; i++) {
  points.push(a.get());
  points.push(b.get());
  points.push(c.get());
  points.push(d.get());
  a.rotateZ(3.14159 * 2/36);
  b.rotateZ(3.14159 * 2/36);
  c.rotateZ(3.14159 * 2/36);
  d.rotateZ(3.14159 * 2/36);
}

for(var i = 0; i < 36; i++) {
  var segmentColor = { r: Math.random() * 255, g: Math.random() * 255, b: Math.random() * 255, a: 255};
  triangles.push([(i * 4 + 2) % 144, (i * 4 + 3) % 144, (i * 4 + 6) % 144, segmentColor]);
  triangles.push([(i * 4 + 3) % 144, (i * 4 + 6) % 144, (i * 4 + 7) % 144, segmentColor]);
}

/*var points = [
  new Vector3( 100,  100,    5),
  new Vector3( 100, -100,    5),
  new Vector3(-100,    0,   15),
  new Vector3( 100,  100,    0),
  new Vector3( 100, -100,    0),
  new Vector3(-100,    0,    0),
  new Vector3( 100,  100,   -5),
  new Vector3( 100, -100,   -5),
  new Vector3(-100,    0,  -15),
];
var triangles = [
  [0, 1, 2, 50],
  [3, 4, 5, 100],
  [6, 7, 8, 150],
];*/

/*var points = [
  new Vector3( 100,  100,    0),
  new Vector3( 100, -100,    0),
  new Vector3(-100,    0,    0),
  new Vector3(   0,   50,   50),
  new Vector3( 100,    0,  100),
  new Vector3(-100,    0,  100),
  new Vector3(   0, -100,  -50),
  new Vector3( 100,    0, -100),
  new Vector3(-100,    0, -100),
];

var triangles = [

  [0, 1, 2, 0],
  [3, 4, 5, 150],
  [6, 7, 8, 150]
];*/

var randomizeArray = function(a) {
  var temp = a.slice();
  var out = [];
  
  while(temp.length > 0) {
    var taken = Math.floor(Math.random() * temp.length);
    out.push(temp.splice(taken, 1)[0]);
  }
  
  return out;
};

triangles = randomizeArray(triangles);

function findLargest(a) {
  var largest = a[0];
  for(var i = 1; i < a.length; i++) {
    if(a[i] > largest) {
      largest = a[i];
    }
  }
  return largest;
}

function findSmallest(a) {
  var smallest = a[0];
  for(var i = 1; i < a.length; i++) {
    if(a[i] < smallest) {
      smallest = a[i];
    }
  }
  return smallest;
}

function triangleSharedPoints(a, b) {
  var shared = [];
  for(var i = 0; i < 3; i++) {
    for(var j = 0; j < 3; j++) {
      if(a[i] === b[j]) {
        shared.push(a[i]);
      }
    }
  }
  return shared;
}
function inAnotB(a, b) {
  a = a.slice();
  var bad;
  for(var i = a.length - 1; i >= 0; i--) {
    bad = false;
    for(var j = 0; j < b.length; j++) {
      if(a[i] === b[j]) {
        bad = true;
      }
    }
    if(bad) {
      a.splice(i, 1);
    }
  }
  return a;
};

function D(p, cross) {
  return cross.x * p.x + cross.y * p.y + cross.z * p.z;
};

function compareTriangles(one, two) {
  /*var zOne = [points[one[0]].z, points[one[1]].z, points[one[2]].z];
  var zTwo = [points[two[0]].z, points[two[1]].z, points[two[2]].z];
  
  if(findSmallest(zTwo) > findLargest(zOne)) {
    return 0;
  }
  if(findSmallest(zOne) > findLargest(zTwo)) {
    return 1;
  }*/
  
  /*var shared = triangleSharedPoints(one, two);
  
  if(shared.length >= 3) {
    return 0;
  }*/
  
  let oneA = points[one[0]];
  let oneB = points[one[1]];
  let oneC = points[one[2]];
  
  let oneLineA = Vector3.sub(oneB, oneA);
  let oneLineB = Vector3.sub(oneC, oneA);
  let oneCross = Vector3.cross(oneLineA, oneLineB).normalize();
  
  let twoA = points[two[0]];
  let twoB = points[two[1]];
  let twoC = points[two[2]];
  
  let twoLineA = Vector3.sub(twoB, twoA);
  let twoLineB = Vector3.sub(twoC, twoA);
  let twoCross = Vector3.cross(twoLineA, twoLineB).normalize();
  
  let reference, referenceCross, other, otherCross, modifier;
  
  if(Math.abs(oneCross.z) >= Math.abs(twoCross.z)) {
    modifier = 0;
    reference = one;
    referenceCross = oneCross;
    other = two;
    otherCross = twoCross;
  }
  else {
    modifier = 1;
    reference = two;
    referenceCross = twoCross;
    other = one;
    otherCross = oneCross;
  }
  
  if(referenceCross.z < 0) {
    referenceCross.mult(-1);
  }
  
  let referencePoint = points[reference[0]];
  let minDist = Vector3.dist(points[reference[0]], Camera);
  for(var i = 1; i < 3; i++) {
    let dist = Vector3.dist(points[reference[i]], Camera);
    if(dist < minDist) {
      minDist = dist;
      referencePoint = points[reference[i]];
    }
  }
  
  let otherPoints = inAnotB([other[0], other[1], other[2]], [reference[0], reference[1], reference[2]]);
  let otherPoint = points[otherPoints[0]];
  for(var i = 1; i < otherPoints.length; i++) {
    if(points[otherPoints[i]].z > otherPoint.z) {
      otherPoint = points[otherPoints[i]];
    }
  }
  
  let dCamera = D(Camera, referenceCross);
  let dReference = D(referencePoint, referenceCross);
  let dOther = D(otherPoint, referenceCross);
  
  /*stroke(0);
  strokeWeight(10);
  point(referencePoint);
  stroke(255, 0, 0);
  point(otherPoint);
  
  /*var twoA = points[inAnotB(two, one)[0]];
  
  var dCamera = D(Camera, cross);
  var dOneA = D(oneA, cross);
  var dTwoA = D(twoA, cross);*/
  
  
  if(dCamera > dReference && dReference > dOther) {
    return modifier;
  }
  else if(dCamera < dReference && dReference < dOther) {
    return modifier;
  }
  return 1 - modifier;
}

function sortTriangles(set) {
  if(set.length === 0) {
    return [];
  }
  if(set.length === 1) {
    return [set[0]];
  }
  if(set.length === 2) {
    if(compareTriangles(set[0], set[1]) === 1) {
      return [set[0], set[1]];
    }
    else {
      return [set[1], set[0]];
    }
  }
  let ahead = [];
  let behind = [];
  for(var i = 1; i < set.length; i++) {
    if(compareTriangles(set[0], set[i]) === 0) {
      behind.push(set[i]);
    }
    else {
      ahead.push(set[i]);
    }
  }
  return sortTriangles(behind).concat([set[0]].concat(sortTriangles(ahead)));
};

var ordered = sortTriangles(triangles.slice());

function draw() {
  background(255);
  pushMatrix();
  translate(Camera.x + width/2, Camera.y + height/2);
  strokeWeight(0.5);
  for(var i = 0; i < ordered.length; i++) {
    fill(ordered[i][3]);
    stroke(ordered[i][3]);
    beginShape();
    for(var j = 0; j < ordered[i].length - 1; j++) {
      var zDif = Camera.z - points[ordered[i][j]].z;
      //vertex(points[ordered[i][j]].x, points[ordered[i][j]].y);
      vertex(points[ordered[i][j]].x * 800/zDif, points[ordered[i][j]].y * 800/zDif);
    }
    var zDif = Camera.z - points[ordered[i][0]].z;
    vertex(points[ordered[i][0]].x * 800/zDif, points[ordered[i][0]].y * 800/zDif);
    endShape();
  }
  /*textSize(16);
  fill(0);
  for(var i = 0; i < points.length; i++) {
    //text(i + ": " + Math.floor(points[i].z) + "", points[i].x, points[i].y - 10);
    var zDif = Camera.z - points[i].z;
    text(i + ": " + Math.floor(points[i].z) + "", points[i].x * 800/zDif, points[i].y * 800/zDif - 10);
  }*/
  ordered = sortTriangles(triangles.slice());
  popMatrix();
};

loop(draw);

mouseDragged = function() {
  for(var i = 0; i < points.length; i++) {
    points[i].rotateX((pmouseY - mouseY)/100);
    points[i].rotateY((pmouseX - mouseX)/100);
  }
}
