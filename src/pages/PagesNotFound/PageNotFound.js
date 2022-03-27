import React from 'react';

export default function PageNotFound(props) {
  return <div>
      Khoông tìm thấy trang: {props.match.url}
  </div>;
}
