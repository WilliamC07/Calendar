import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import * as data from "../data/calendar/data";
import * as action from "./actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

function CategoryBoxConnect({categories, createCategory, updateCategory, deleteCategory}){
    // none: no category selected | create: new event made | view: old event viewing
    const [mode, setMode] = useState("none");
    // -1 for "none" or "create" mode | other positive integers for view
    const [selectedCategoryID, setSelectedCategoryID] = useState(1);
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");

    // update view if categories update
    useEffect(() => {
        if(categories.length > 0){
            const lastCategory = categories[categories.length - 1];
            setSelectedCategoryID(lastCategory.id);
            setCategoryAttributeToState(lastCategory);
            setMode("view");
        }
    }, [categories]);

    function chooseCategoryHandler(e){
        const targetID = parseInt(e.target.value);
        setSelectedCategoryID(targetID);
        setCategoryAttributeToState(categories.filter(c => c.id.toString() === targetID.toString())[0]);
    }
    function createNewCategoryHandler(e){
        setMode("create");
        setCategoryName("");
        setCategoryColor("");
        setCategoryDesc("");
    }
    function createOrUpdateHandler(e){
        e.preventDefault();
        const categoryDetails = [categoryName, categoryColor, categoryDesc];
        if(mode === "create"){
            // id will be set automatically from the database when added
            createCategory(categoryDetails);
        }else{
            // don't modify category directly (don't modify state directly), create copy instead
            updateCategory(selectedCategoryID, categoryDetails);
        }
    }
    function cancelCreationHandler(e){
        e.preventDefault();
        if(mode === "create"){
            if(categories.length === 0){
                setMode("none");
            }else{
                const lastCategory = categories[categories.length - 1];
                setCategoryAttributeToState(lastCategory);
                setSelectedCategoryID(lastCategory.id);
                setMode("view");
            }
        }else{
            setCategoryAttributeToState(categories.filter(c => c.id === selectedCategoryID)[0]);
        }
    }
    function deleteCategoryHandler(e){
        e.preventDefault();
        const toDelete = selectedCategoryID;
        if(categories.length <= 1){
            // no other event to choose after we delete
            setMode("none");
        }else{
            // select the first category we find that isn't the one we are going to delete
            for(const category of categories){
                if(category.id.toString() !== selectedCategoryID.toString()){
                    setSelectedCategoryID(category.id);
                    break;
                }
            }
        }
        deleteCategory(toDelete);
    }

    function setCategoryAttributeToState(category){
        setCategoryName(category.name);
        setCategoryColor(category.color);
        setCategoryDesc(category.description);
    }

    return (
        <div className="categoryBox">
            <form>
                <div className="choosingCategory">
                    <select value={mode === "view" ? selectedCategoryID.toString() : "-1"} onChange={chooseCategoryHandler}>
                        {mode === "view" && categories.map(category => <option value={category.id}
                                                            key={category.name + category.id}>{category.name}</option>)}
                        {mode === "create" && <option value="-1">New Category</option>}
                        {mode === "none" && <option value="-1">Nothing Selected</option>}
                    </select>
                    <label className={mode==="create" ? "selectedText" : "regularText"}
                           onClick={createNewCategoryHandler}>
                        New Category<FontAwesomeIcon icon={faPlus} fixedWidth size="sm"/>
                    </label>
                </div>
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
                {
                    mode !== "none" &&
                        <div className="inputGroup">
                        <button className="create" onClick={createOrUpdateHandler}>{mode === "create" ? "Create" : "Update"}</button>
                        <button className="cancel" onClick={cancelCreationHandler}>Cancel</button>
                        {mode === "view" && <button className="cancel" onClick={deleteCategoryHandler}>Delete</button>}
                    </div>
                }
            </form>
        </div>
    )
}


function mapStateToProps(store){
    return {
        categories: store.calendar.categories,
        selectedCategoryID: store.calendar.selectedCategoryID,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        /**
         * @param categoryDetails {Array.<{name: string, color: string, description: string}>}
         */
        createCategory: (categoryDetails) => {
            const createdCategory = data.createCategory(categoryDetails);
            dispatch(action.addCategory(createdCategory));
        },
        /**
         * @param id {number} id of the category to update
         * @param categoryDetails {Array.<{name: string, color: string, description: string}>}
         */
        updateCategory: (id, categoryDetails) => {
            const updatedCategory = data.updateCategory(id, categoryDetails);
            console.log("update: ", updatedCategory);
            dispatch(action.updateCategory(updatedCategory));
        },
        /**
         * @param categoryID {number}
         */
        deleteCategory: (id) => {
            data.deleteCategory(id);
            dispatch(action.deleteCategory(id));
        }
    }
}

const CategoryBox = connect(mapStateToProps, mapDispatchToProps)(CategoryBoxConnect);
export default CategoryBox;