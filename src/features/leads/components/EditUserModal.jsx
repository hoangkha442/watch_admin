// EditUserModal.js
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
// import { leadservice } from '../../../services/leadservice';
import { userService } from '../../../services/UserService';

export default function EditUserModal({ closeModal, extraObject }) {
  const dispatch = useDispatch();
  const [leadObj, setLeadObj] = useState({
    full_name: extraObject.full_name || '',
    email: extraObject.email || '',
    password: extraObject.password || '',
    phone: extraObject.phone || '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setLeadObj((prev) => ({ ...prev, [updateType]: value }));
  };

  const saveNewLead = () => {
    // Helper function for email validation
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Validation logic refactored
    if (!leadObj.full_name.trim()) {
        setErrorMessage('Họ tên không được bỏ trống!');
    } else if (!leadObj.email.trim()) {
        setErrorMessage('Email không được bỏ trống!');
    } else if (!validateEmail(leadObj.email)) {
        setErrorMessage('Email không hợp lệ!');
    } else if (!leadObj.password.trim()) {
        setErrorMessage('Mật khẩu không được bỏ trống!');
    } else if (!leadObj.phone.trim()) {
        setErrorMessage('Số điện thoại không được bỏ trống!');
    } else {
        // Proceed with saving operation if validation passes
        const newUser = {
            ...extraObject,
            full_name: leadObj.full_name,
            email: leadObj.email,
            password: leadObj.password,
            phone: leadObj.phone
        };
        userService.updateUser(extraObject.user_id, newUser)
            .then((res) => {
                dispatch(showNotification({ message: 'Chỉnh sửa thông tin người dùng thành công!', status: 1 }));
                closeModal(); // Close modal upon successful operation
            })
            .catch((err) => {
                console.log('err: ', err);
                // It's good practice to inform the user of the error as well
                dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
            });
    }
};
  return (
    <>
      <InputText defaultValue={leadObj.full_name} updateType="full_name" labelTitle="Họ tên" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="email" defaultValue={leadObj.email} updateType="email" labelTitle="Email" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText type="password" defaultValue='' placeholder='***********' updateType="password" labelTitle="Mật khẩu" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <InputText defaultValue={leadObj.phone} updateType="phone" labelTitle="Số điện thoại" updateFormValue={updateFormValue} containerStyle="mt-4" />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveNewLead}>Save</button>
      </div>
    </>
  );
}
