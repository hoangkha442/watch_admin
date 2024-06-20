import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputText from '../../../components/Input/InputText';
import ErrorText from '../../../components/Typography/ErrorText';
import { showNotification } from '../../common/headerSlice';
import { userService } from '../../../services/UserService';
import { fetchUsers } from '../userSlice';

export default function EditUserModal({ closeModal, extraObject }) {
  const currentPage = useSelector((state) => state.users.currentPage);
  const dispatch = useDispatch();

  const [userObj, setUserObj] = useState({
    full_name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  // Đồng bộ userObj với extraObject khi extraObject thay đổi
  useEffect(() => {
    setUserObj({
      full_name: extraObject.full_name || '',
      email: extraObject.email || '',
      password: '',
      phone: extraObject.phone || '',
    });
  }, [extraObject]);

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage('');
    setUserObj((prev) => ({ ...prev, [updateType]: value }));
  };

  const saveUser = () => {
    const validateEmail = (email) => {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };

    if (!userObj.full_name.trim()) {
      setErrorMessage('Họ tên không được bỏ trống!');
    } else if (!userObj.email.trim()) {
      setErrorMessage('Email không được bỏ trống!');
    } else if (!validateEmail(userObj.email)) {
      setErrorMessage('Email không hợp lệ!');
    } else if (!userObj.phone.trim()) {
      setErrorMessage('Số điện thoại không được bỏ trống!');
    } else {
      const updatedUser = {
        ...extraObject,
        full_name: userObj.full_name,
        email: userObj.email,
        password: userObj.password,
        phone: userObj.phone,
      };
      userService.updateUser(extraObject.user_id, updatedUser)
        .then((res) => {
          dispatch(showNotification({ message: 'Chỉnh sửa thông tin người dùng thành công!', status: 1 }));
          dispatch(fetchUsers({ currentPage, sizeItem: 5 }));
          closeModal();
        })
        .catch((err) => {
          console.log('err: ', err);
          dispatch(showNotification({ message: 'Có lỗi xảy ra khi chỉnh sửa thông tin.', status: 0 }));
        });
    }
  };

  return (
    <>
      <InputText
        value={userObj.full_name}
        updateType="full_name"
        labelTitle="Họ tên"
        updateFormValue={updateFormValue}
        containerStyle="mt-4"
      />
      <InputText
        type="email"
        value={userObj.email}
        updateType="email"
        labelTitle="Email"
        updateFormValue={updateFormValue}
        containerStyle="mt-4"
      />
      <InputText
        type="password"
        value={userObj.password}
        placeholder='***********'
        updateType="password"
        labelTitle="Mật khẩu"
        updateFormValue={updateFormValue}
        containerStyle="mt-4"
      />
      <InputText
        value={userObj.phone}
        updateType="phone"
        labelTitle="Số điện thoại"
        updateFormValue={updateFormValue}
        containerStyle="mt-4"
      />
      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={saveUser}>Save</button>
      </div>
    </>
  );
}
