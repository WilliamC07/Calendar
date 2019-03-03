class Person{
    constructor(){
        this.personID = Person.prototype.nextPersonID++;
    }
}

Person.prototype.nextPersonID = 0;

let william = new Person();

console.log(william.personID);
console.log(william.nextPersonID);

let billy = new Person();

console.log(billy.personID);
console.log(billy.nextPersonID);