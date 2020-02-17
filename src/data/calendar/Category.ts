export default class Category{
    /**
     * Creates a Category
     * @param name {string} Name of the category
     * @param color {string} Hexadecimal representation with leading '#'. Example: "#ffffff"
     * @param description {string} Description of the category
     */
    constructor(name, color, description){
        this.id = -1; // this will be set when we insert into the sqlite database
        this.name = name;
        this.color = color;
        this.description = description;
    }
}