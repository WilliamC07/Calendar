import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {calendarData} from '../data/data';

function CategoryBoxConnect({categories, updateCategory, deleteCategory, addCategory, getCategories}){
    // none: no category selected | create: new event made | view: old event viewing
    const [mode, setMode] = useState("none");
    // -1 for "none" or "create" mode | other positive integers for view
    const [selectedCategoryID, setSelectedCategoryID] = useState(1);
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
        const createdCategory = {name: categoryName, color: categoryColor, description: categoryDesc};
        if(mode === "create"){
            // id will be set automatically from the database when added
            addCategory(createdCategory);
        }else{
            // don't modify category directly (don't modify state directly), create copy instead
            createdCategory.id = selectedCategoryID;
            updateCategory(createdCategory);
        }
    }
    function cancelCreationHandler(e){
        e.preventDefault();
        if(mode === "create"){
            setMode("view")
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
        updateCategory: (category) => calendarData.updateCategory(category, dispatch),
        deleteCategory: (id) => calendarData.removeCategory(id, dispatch),
        addCategory: (category) => calendarData.insertCategory(category, dispatch),
        getCategories: () => calendarData.getCategories(dispatch),
    }
}

const CategoryBox = connect(mapStateToProps, mapDispatchToProps)(CategoryBoxConnect);
export default CategoryBox;