import React, {useState, useEffect, ChangeEvent} from 'react';
import {connect} from 'react-redux';
import * as data from "../../../data/calendar/data";
import * as actions from "../../../store/calendar/actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Dispatch} from "redux";
import Category from "../../category";
import {ApplicationState} from "../../../store";

type Props = {
  categories: Category[];
  createCategory: (newCategory: Category) => void;
  updateCategory: (newCategory: Category) => void;
  deleteCategory: (id: number) => void;
}

const CategoryBox: React.FC<Props> = ({categories, createCategory, updateCategory, deleteCategory}) => {
  const [isCreateMode, setIsCreateMode] = useState<boolean>(categories.length === 0);
  // -1 if user did not select any categories
  const [selectedCategoryID, setSelectedCategoryID] = useState(-1);
  const [categoryDetails, setCategoryDetails] = useState({
    name: "",
    color: "",
    description: ""
  });

  // user selected a new category
  useEffect(() => {
    if(selectedCategoryID !== -1){
      // user selected a category
      const selectedCategory = categories.filter(c => c.id === selectedCategoryID)[0];
      setCategoryDetails({
        name: selectedCategory.name,
        color: selectedCategory.color,
        description: selectedCategory.description
      });
      setIsCreateMode(false);
    }else{
      // user did not choose a category
      setCategoryDetails({
        name: "",
        color: "",
        description: ""
      });
      setIsCreateMode(true);
    }
  }, [selectedCategoryID]);

  // Set default value to isCreateMode, selectedCategoryID, and categoryDetails
  useEffect(() => {
    if (categories.length > 0) {
      // at least 1 category exist
      const lastCategory = categories[categories.length - 1];
      setSelectedCategoryID(lastCategory.id);
    } else {
      // no categories exist
      setSelectedCategoryID(-1);
    }
  }, [categories]);

  function chooseCategoryHandler(e: React.FormEvent<HTMLSelectElement>) {
    const targetID = parseInt(e.currentTarget.value);
    setSelectedCategoryID(targetID);
  }

  function createNewCategoryHandler() {
    setSelectedCategoryID(-1);
  }

  function createOrUpdateHandler(e: React.FormEvent<HTMLButtonElement>) {
    const newCategory = new Category(categoryDetails.name, categoryDetails.color, categoryDetails.description);
    if (isCreateMode) {
      createCategory(newCategory);
    } else {
      updateCategory(newCategory);
    }
  }

  function cancelCreationHandler(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if(isCreateMode){
      if(categories.length === 0){
        setSelectedCategoryID(-1);
      }else{
        setSelectedCategoryID(categories[0].id);
      }
    }else{
      // put the old values back
      const selectedCategory = categories.filter(c => c.id === selectedCategoryID)[0];
      setCategoryDetails({
        name: selectedCategory.name,
        color: selectedCategory.color,
        description: selectedCategory.description
      });
    }
  }

  function deleteCategoryHandler(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    deleteCategory(selectedCategoryID);
  }

  function changeCategoryDetailsHandler(e: ChangeEvent<HTMLInputElement>){
    setCategoryDetails({
      ...categoryDetails,
      [e.target.id]: e.target.value
    });
  }

  return (
    <div className="categoryBox">
      <div className="choosingCategory">
        <select value={isCreateMode ? "-1" : selectedCategoryID.toString()} onChange={chooseCategoryHandler}>
          {!isCreateMode && categories.map(category => <option value={category.id} key={category.name + category.id}>{category.name}</option>)}
          {isCreateMode && <option value="-1">New Category</option>}
        </select>
        <label className={isCreateMode ? "selectedText" : "regularText"} onClick={createNewCategoryHandler}>
          New Category<FontAwesomeIcon icon={faPlus} fixedWidth size="sm"/>
        </label>
      </div>
      <div className="inputGroup">
        <label>Name:</label>
        <input type="text" value={categoryDetails.name} id="name" onChange={changeCategoryDetailsHandler}/>
      </div>
      <div className="inputGroup">
        <label>Color:</label>
      </div>
      <div className="inputGroup">
        <label>Description:</label>
        <input type="text" value={categoryDetails.description} id="description" onChange={changeCategoryDetailsHandler}/>
      </div>
      <div className="inputGroup">
        <button className="create" onClick={createOrUpdateHandler}>{isCreateMode ? "Create" : "Update"}</button>
        <button className="cancel" onClick={cancelCreationHandler}>Cancel</button>
        {!isCreateMode && <button className="cancel" onClick={deleteCategoryHandler}>Delete</button>}
      </div>
    </div>
  )
};

function mapStateToProps({calendar}: ApplicationState) {
  return {
    categories: calendar.categories,
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    createCategory: (newCategory: Category) => {
      data.createCategory(newCategory);
      dispatch(actions.createCategory(newCategory));
    },
    updateCategory: (newCategory: Category) => {
      data.updateCategory(newCategory);
      dispatch(actions.updateCategory(newCategory));
    },
    deleteCategory: (id: number) => {
      data.deleteCategory(id);
      dispatch(actions.deleteCategory(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryBox);