import React from 'react';
import { Formik } from 'formik';
import { Header, Button, Form, Label, Field } from './Searchbar-styled';
import PropTypes from 'prop-types';

const initialValues = {
  searchQuery: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Button type="submit">
            <Label>Search</Label>
          </Button>
          <Field
            type="text"
            name="searchQuery"
            placeholder="Search images and photos"
          ></Field>
        </Form>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  initialValues: PropTypes.shape({
    searchQuery: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func.isRequired,
};
