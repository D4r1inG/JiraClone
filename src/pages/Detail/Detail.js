import React from 'react';

export default function Detail(props) {
  return <div>
      Giá trị tham số : {props.match.params.id}
  </div>;
}
