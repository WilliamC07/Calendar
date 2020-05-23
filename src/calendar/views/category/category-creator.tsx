import React, {ChangeEvent, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import * as data from "../../../data/calendar/data";
import * as calendarActions from "../../../store/calendar/actions";
import * as notifyActions from "../../../store/notification/actions";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Dispatch} from "redux";
import Category from "../../category";
import {ApplicationState} from "../../../store";
import {Notification, NotificationType} from "../../../notification/notification";
import "./style.scss";

type Props = {
  categories: Category[];
  createCategory: (newCategory: Category) => void;
  updateCategory: (newCategory: Category) => void;
  deleteCategory: (id: number) => void;
  notify: (notification: Notification) => void;
}

const CategoryCreator: React.FC<Props> = ({categories, createCategory, updateCategory, deleteCategory, notify}) => {
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
    try {
      const newCategory = new Category(categoryDetails.name, categoryDetails.color, categoryDetails.description);
      if (isCreateMode) {
        createCategory(newCategory);
      } else {
        updateCategory(newCategory);
      }
      notify(new Notification(NotificationType.SUCCESS, "Successfully created category!"));
    }catch(e){
      notify(new Notification(NotificationType.ERROR, e.message));
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
    <div className="category-container">
      <div className="input-group">
        <select className="success" value={isCreateMode ? "-1" : selectedCategoryID.toString()} onChange={chooseCategoryHandler}>
          {!isCreateMode && categories.map(category => <option value={category.id} key={category.name + category.id}>{category.name}</option>)}
          {isCreateMode && <option value="-1">New Category</option>}
        </select>
        <button className={(isCreateMode ? "success" : "default") + " ml-auto"} onClick={createNewCategoryHandler}>
          <FontAwesomeIcon icon={faPlus} fixedWidth size="sm"/>
        </button>
      </div>
      <div className="input-group">
        <label>Name:</label>
        <input type="text" value={categoryDetails.name} id="name" onChange={changeCategoryDetailsHandler}/>
      </div>
      <div className="input-group">
        <label>Color:</label>
      </div>
      <div className="input-group">
        <label>Description:</label>
        <input type="text" value={categoryDetails.description} id="description" onChange={changeCategoryDetailsHandler}/>
      </div>
      <div className="input-group">
        <button className="success" onClick={createOrUpdateHandler}>{isCreateMode ? "Create" : "Update"}</button>
        <button className="danger" onClick={cancelCreationHandler}>Cancel</button>
        {!isCreateMode && <button className="danger" onClick={deleteCategoryHandler}>Delete</button>}
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
      dispatch(calendarActions.createCategory(newCategory));
    },
    updateCategory: (newCategory: Category) => {
      data.updateCategory(newCategory);
      dispatch(calendarActions.updateCategory(newCategory));
    },
    deleteCategory: (id: number) => {
      data.deleteCategory(id);
      dispatch(calendarActions.deleteCategory(id));
    },
    notify: (notification: Notification) => dispatch(notifyActions.notify(notification)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryCreator);