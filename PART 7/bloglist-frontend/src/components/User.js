import React from 'react';
import { Link } from 'react-router-dom';

const User = ({ name, blogs, id }) => (
  <tr>
    <td><Link to={`/users/${id}`}>{name}</Link></td>
    <td>{blogs}</td>
  </tr>
);

export default User;