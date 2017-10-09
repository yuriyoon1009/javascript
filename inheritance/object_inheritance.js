function Vehicle(name, speed) {
    this.name = name;
    this.speed = speed;
};

Vehicle.prototype.drive = function() {
    console.log(this.name + ' runs at ' + this.speed)
};

var tico = new Vehicle('tico', 50);

tico.drive(); // tico runs at 50

//Vehicle을 상속하는 클래스
function Sedan(name, speed, maxSpeed) {
    //Vehicle 상속
    Vehicle.apply(this, arguments);
    this.maxSpeed = maxSpeed;
}

//Object.create는 Vehicle.prototype을 상속하는 새로운 객체를 만드는 메소드입니다.
//그 상속한 객체를 Sedan.prototype에 대입하니까 Sedan이 Vehicle을 상속하게 되는 거죠.
// Object.create(Vehicle.prototype)과 new Vehicle()의 차이
// Object.create는 객체를 만들되 생성자는 실행하지 않는다. 즉 그냥 프로토타입만.
Sedan.prototype = Object.create(Vehicle.prototype);

//Sedan.prototype.constructor === Vehicle; error
//to deal with that error
Sedan.prototype.constructor = Sedan;

//Sedan 생성자 함수는 name, speed, maxSpeed, (prototype.)drive, boost 메소드 잇음
Sedan.prototype.boost = function() {
    console.log(this.name + ' boosts its speed at ' + this.maxSpeed);
}

var sonata = new Sedan('sonata', 100, 200);

sonata.drive();
sonata.boost();

//truck 생성자 함수, 메소드 name, spped, capcity, dirve, load
function Truck(name, spped, capacity) {
    Vehicle.apply(this, arguments);
    //capcity : the maximum amount 
    this.capacity = capacity;
}

// drive
Truck.prototype = Object.create(Vehicle.prototype);
// to deal with error
Truck.prototype.constructor = Truck;
// load method
Truck.prototype.load = function(weight) {
    if (weight > this.capacity) {
        return console.error("omg, it's overload")
    }
    return console.log('You can load this stuff on')
};

var myTruck = new Truck('myTruck', 10, 100);
myTruck.drive();
myTruck.load(30); //You can load this stuff on
myTruck.load(500); //omg, it's overload