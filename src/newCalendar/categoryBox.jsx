import React, {useState} from 'react';
import {connect} from 'react-redux';
import Category from "../money/category";

function CategoryBoxConnect({}){
    // todo: initial state is the last one opened
    const [categorySelected, setCategorySelected] = useState("School");

    return (
        <div className="categoryBox">
            <div>
                <select value={categorySelected} onChange={(e) => setCategorySelected(e.target.value)}>
                    <option value="School">School</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Work">Work</option>
                </select>
            </div>
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