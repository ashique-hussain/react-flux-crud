import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    category: "",
    authorId: null
  });

  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      courseApi.getCourseBySlug(slug).then(_course => {
        setCourse(_course);
      });
    }
  }, [props.match.params.slug]);

  function handleChnage({ target }) {
    const updatedCourse = {
      ...course,
      [target.name]: target.value
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};
    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";
    setErrors(_errors);
    //form is valid if the error object is empty
    return Object.keys(_errors).length === 0;
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses");
      toast.success("save Success");
    });
  }
  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        error={errors}
        course={course}
        onChange={handleChnage}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
