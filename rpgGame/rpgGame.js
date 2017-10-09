var log = document.getElementById('log');

function logMessage(msg, color) {
    //(!undefined), true
    //(!not undeined), false
    if (!color) { color = 'black' }
    var div = document.createElement('div');
    div.style.color = color;
    div.innerHTML = msg;
    // document.getElementById('log').append(div);
    log.appendChild(div);

}

logMessage('RPG game', 'pink');

var gameover = false;
var battle = false;

function Character(name, hp, att) {
    this.name = name;
    this.hp = hp;
    //att == punch power
    this.att = att;
}

Character.prototype.attacked = function(damage) {
    this.hp -= damage;
    logMessage('After attacked,' + this.name + ' left ' + this.hp + 'hp');

    //question
    if (this.hp <= 0) {
        battle = false;
    }
}

Character.prototype.attack = function(target) {
    logMessage(this.name + ' targets ' + target.name, 'purple')
    target.attacked(this.att);
}

function Hero(name, hp, att, lev, xp) {
    //Character name, hp, att method
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 0;
}

// attack, attacked
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.attacked = function(damage) {
    this.hp -= damage;
    logMessage('After attacked,' + this.name + ' left ' + this.hp + 'hp', 'red');
    //add
    if (this.hp <= 0) {
        logMessage(this.name + ' died' + ', so this adventure is over!' +
            'If you want to restart the game, press the f5 button');
        battle = false;
        gameover = true;
    }
}

Hero.prototype.attack = function(target) {
    logMessage(this.name + ' targets ' + target.name)
    target.attacked(this.att);
    if (target.hp <= 0) {
        this.gainXp(target);
    }
}

Hero.prototype.gainXp = function(target) {
    logMessage('You win !, so you get ' + target.xp + 'xp', 'blue');
    this.xp += target.xp;

    //level 1 xp > 110; level 2 xp >120; level 3 xp > 130
    if (this.xp > 30 + 10 * this.lev) {
        this.lev++;
        logMessage('Level up ' + this.lev, 'blue');
        this.hp = 30 + this.lev * 10;
        this.xp -= 10 * this.lev + 30;
    }
    /* logMessage('Level up ' + this.lev, 'blue');
    this.lev++;
    this.hp += target.xp;*/

}


function Monster(name, hp, att, lev, xp) {
    Character.apply(this, arguments);
    this.lev = lev || 1;
    this.xp = xp || 10;
}

Monster.prototype = Object.create(Character.prototype);
Monster.prototype.constructor = Monster;

function makeMonster() {
    var monsterArray = [
        ['rabbit', 25, 3, 1, 35],
        ['skeleton', 50, 6, 2, 50],
        ['solider', 80, 4, 3, 75],
        ['king', 500, 9, 4, 110],
        ['devil', 120, 25, 6, 250]
    ]
    var monster = monsterArray[Math.floor(Math.random() * 5)];
    return new Monster(monster[0], monster[1], monster[2], monster[3], monster[4])
}

var hero = new Hero(prompt("what is your Character's name"), 100, 10);
logMessage(hero.name + ' starts his adventure ! How many level up !');

//var gameover = false
//(!false) = true;

while (!gameover) {
    var monster = makeMonster();
    logMessage(monster.name + ' comes out', 'green');
    battle = true;

    while (battle) {
        hero.attack(monster);
        if (monster.hp > 0) {
            monster.attack(hero);
        }
    }
}