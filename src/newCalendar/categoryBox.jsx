import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import Category from "../money/category";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {calendarData} from '../data/data';

function CategoryBoxConnect({categories, updateCategory, deleteCategory, addCategory, getCategories}){
    // todo: initial state is the last one opened
    const [categorySelected, setCategorySelected] = useState(1);
    const [isCreatingNewField, setIsCreatingNewField] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");
    const firstUpdate = useRef(true);

    // load data from disk the first time this component renders
    useEffect(() => {
        if(firstUpdate.current){
            getCategories();
            firstUpdate.current = false;
        }
    });

    function cancelCreation(e){
        e.preventDefault();
        if(isCreatingNewField){
            // todo: go back to last selected item
        }else{
            // todo: go back to using existing
        }
    }

    function createOrUpdate(e){
        e.preventDefault();
        if(isCreatingNewField){
            addCategory({name: categoryName, color: categoryColor, description: categoryDesc});
            // go back to viewing previous element
            setIsCreatingNewField(false);
        }else{

        }
    }

    return (
        <div className="categoryBox">
            <div className="choosingCategory">
                <select value={isCreatingNewField ? "-1" : categorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
                    {categories.map(category => <option value={category.id}
                                                        key={category.name + category.id}>{category.name}</option>)}
                    {isCreatingNewField && <option value="-1">New Event</option>}
                </select>
                <label htmlFor="newEventButton" className={isCreatingNewField ? "selectedText" : "regularText"}
                       onClick={() => setIsCreatingNewField(!isCreatingNewField)}>
                    New Event<FontAwesomeIcon icon={faPlus} fixedWidth id="newEventButton" size="sm"/>
                </label>
            </div>
            <form>
                <div className="inputGroup">
                    <label>Name:</label>
                    <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <label>Color:</label>
                </div>
                <div className="inputGroup">
                    <label>Description:</label>
                    <input type="text" value={categoryDesc} onChange={(e) => setCategoryDesc(e.target.value)}/>
                </div>
                <div className="inputGroup">
                    <button className="regularText" onClick={createOrUpdate}>{isCreatingNewField ? "create" : "update"}</button>
                    <button className="cancel" onClick={cancelCreation}>Cancel</button>
                </div>
            </form>
        </div>
    )
}


function mapStateToProps(store){
    return {
        categories: store.calendar.categories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateCategory: (category) => calendarData.updateCategory(category, dispatch),
        deleteCategory: (id) => calendarData.removeCategory(id, dispatch),
        addCategory: (category) => calendarData.insertCategory(category, dispatch),
        getCategories: () => calendarData.getCategories(dispatch),
    }
}

const CategoryBox = connect(mapStateToProps, mapDispatchToProps)(CategoryBoxConnect);
export default CategoryBox;