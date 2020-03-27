/**
 * Every {@link Event} must have a Category.
 *
 * Relationship: Many to one
 */
export default class Category{
    /**
     * This value should be set when you insert into the database. Should be unique.
     */
    id: number;
    name: string;
    color: string;
    description: string;

    /**
     * Creates a new category
     * @param name Name of the category
     * @param color Color of the category. Formatted as "#xxxxxx"
     * @param description Description of the category
     */
    constructor(name: string, color: string, description: string){
        this.id = -1; // this will be set when we insert into the sqlite database
        this.name = name;
        this.color = color;
        this.description = description;
    }
}