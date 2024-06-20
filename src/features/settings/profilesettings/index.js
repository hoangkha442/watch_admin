import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import TitleCard from "../../../components/Cards/TitleCard";
import { showNotification } from '../../common/headerSlice';
import InputText from '../../../components/Input/InputText';
import ErrorText from "../../../components/Typography/ErrorText";
import { userService } from "../../../services/UserService";
import { BASE_URL_IMG_USER } from "../../../services/config";

function ProfileSettings() {
  const [errorMessage, setErrorMessage] = useState('');
  const [userObj, setUserObj] = useState({
    user_id: 0,
    full_name: '',
    email: '',
    password: '',
    phone: '',
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await userService.getUserID(27);
      setUserObj({
        user_id: res.data.user_id,
        full_name: res.data.full_name || '',
        email: res.data.email || '',
        password: '', // Avoid storing password in state
        phone: res.data.phone || '',
        avatar: res.data.avatar || '',
      });
      setAvatarPreview(null); // Reset avatar preview
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setUserObj((prevState) => ({
      ...prevState,
      [updateType]: value
    }));
    setErrorMessage('');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(file);
  };

  const validateProfile = () => {
    const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    };
    if (!userObj.full_name.trim()) {
      return 'Họ tên không được bỏ trống!';
    } else if (!userObj.email.trim()) {
      return 'Email không được bỏ trống!';
    } else if (!validateEmail(userObj.email)) {
      return 'Email không hợp lệ!';
    } else if (!userObj.phone.trim()) {
      return 'Số điện thoại không được bỏ trống!';
    }
    return null;
  };

  const updateProfile = async () => {
    const errorMessage = validateProfile();
    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    try {
      // Update profile details
      await userService.updateUser(userObj.user_id, {
        full_name: userObj.full_name,
        email: userObj.email,
        password: userObj.password,
        phone: userObj.phone,
      });

      // Upload avatar if selected
      if (avatarPreview) {
        const formData = new FormData();
        formData.append('avatar', avatarPreview);

        await userService.uploadAvatar(userObj.user_id, formData);
      }

      dispatch(showNotification({ message: "Profile Updated", status: 1 }));
      resetForm(); // Reset form after successful update
    } catch (error) {
      console.log('Error updating profile:', error);
      dispatch(showNotification({ message: 'Có lỗi xảy ra khi cập nhật thông tin.', status: 0 }));
    }
  };

  const resetForm = () => {
    fetchUserData(); // Reload the user's data
    fileInputRef.current.value = ''; // Clear the file input
    setAvatarPreview(null); // Clear the avatar preview
  };

  return (
    <>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText value={userObj?.full_name} updateType="full_name" labelTitle="Họ tên" name="full_name" updateFormValue={updateFormValue} containerStyle="mt-4" />
          <InputText type="email" value={userObj?.email} updateType="email" labelTitle="Email" name="email" updateFormValue={updateFormValue} containerStyle="mt-4" />
          <InputText type="password" value='' placeholder='***********' updateType="password" labelTitle="Mật khẩu" name="password" updateFormValue={updateFormValue} containerStyle="mt-4" />
          <InputText value={userObj?.phone} updateType="phone" labelTitle="Số điện thoại" name="phone" updateFormValue={updateFormValue} containerStyle="mt-4" />
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text text-base-content">Avatar</span>
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="input input-bordered w-full flex items-center justify-center py-2 cursor-pointer"
            >
              {avatarPreview || userObj?.avatar ? "Change Avatar" : "Upload Avatar"}
            </button>
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <div className="flex justify-center mt-4">
              {avatarPreview ? (
                <img 
                  src={URL.createObjectURL(avatarPreview)} 
                  alt="Avatar Preview" 
                  className="rounded-full h-24 w-24 border-2 border-gray-300 shadow-sm"
                />
              ) : userObj.avatar ? (
                <img 
                  src={`${BASE_URL_IMG_USER}${userObj.avatar}`} 
                  alt="Current Avatar" 
                  className="rounded-full h-24 w-24 border-2 border-gray-300 shadow-sm"
                />
              ) : (
                <div className="rounded-full h-24 w-24 flex items-center justify-center border-2 border-gray-300 text-gray-400">
                  No Image
                </div>
              )}
            </div>
            <ErrorText styleClass="mt-2 text-red-600">{errorMessage}</ErrorText>
          </div>
        </div>
        <div className="mt-16">
          <button className="btn btn-primary float-right" onClick={updateProfile}>Cập nhật</button>
        </div>
      </TitleCard>
    </>
  );
}

export default ProfileSettings;
