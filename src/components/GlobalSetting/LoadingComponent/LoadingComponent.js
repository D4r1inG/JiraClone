import React from 'react';
import { useSelector } from 'react-redux';
import style from './LoadingComponent.module.css'

export default function LoadingComponent() {

  const { isLoading } = useSelector(state => state.LoadingReducer)

  if (isLoading) {
    return <div className={style.bgLoading}>
      <img src={require('../../../assets/imgLoading/loading-gif-icon-14.jpg')} />
    </div>;
  }else{
    return ''
  }
}
