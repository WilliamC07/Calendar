import React, {useState} from 'react';
import {connect} from 'react-redux';
import Category from "../money/category";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

function CategoryBoxConnect({}){
    // todo: initial state is the last one opened
    const [categorySelected, setCategorySelected] = useState("School");
    const [isCreatingNewField, setIsCreatingNewField] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryColor, setCategoryColor] = useState("");
    const [categoryDesc, setCategoryDesc] = useState("");

    function cancelCreation(){
        if(isCreatingNewField){
            // todo: go back to last selected item
        }else{
            // todo: go back to using existing
        }
    }

    function createCategory(){

    }

    function updateCategory(){

    }

    return (
        <div className="categoryBox">
            <div>
                <select value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
                    <option value="School">School</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Work">Work</option>
                </select>
                <FontAwesomeIcon icon={faPlus} fixedWidth/>
            </div>
            <form>
                <div className="inputGroup">
                    <label>Name</label>
                    <input type="text"/>
                </div>
                <div className="inputGroup">
                    <label>Color</label>
                </div>
                <div className="inputGroup">
                    <label>Description</label>
                    <input type="text" value={categoryDesc}/>
                </div>
                <div>
                    <input type="button" value={isCreatingNewField ? "create" : "update"}/>
                    <input type="button" value="cancel" onClick={cancelCreation}/>
                </div>
            </form>
        </div>
    )
}


function mapStateToProps(){
    return {

    }
}

function mapDispatchToProps(){
    return {

    }
}

const CategoryBox = connect(mapStateToProps, mapDispatchToProps)(CategoryBoxConnect);
export default CategoryBox;