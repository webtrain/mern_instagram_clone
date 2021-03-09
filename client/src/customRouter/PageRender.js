import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { useSelector } from 'react-redux';

// Generate dynamic page Components for routing

export const generatePage = (pageName) => {
  const component = () => require(`../pages/${pageName}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let pageName = '';

  auth.token && (id ? (pageName = `${page}/[id]`) : (pageName = page));


  return generatePage(pageName);
};

export default PageRender;
