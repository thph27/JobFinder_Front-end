import React from 'react'
import { useEffect, useState } from 'react';
import { handleChangePassword } from '../../../service/userService';
import { toast } from 'react-toastify';
import './ChangePassword.css';
const ChangePassword = (props) => {
    const [inputValues, setInputValues] = useState({
        password: '', oldPassword: '', confirmPassword: ''
    });
    const [user, setUser] = useState({})
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
    }, [])
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    const togglePasswordVisibility = (field) => {
        setShowPassword(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    let handleSave = async () => {
        if (inputValues.password !== inputValues.confirmPassword) {
            toast.error("Mật khẩu nhập lại không đúng")
            return
        }
        let res = await handleChangePassword({
            id: user.id,
            oldpassword: inputValues.oldPassword,
            password: inputValues.password
        })
        if (res && res.errCode === 0) {
            toast.success("Đổi mật khẩu thành công")
            setInputValues({
                ...inputValues,
                ["oldPassword"]: '',
                ["password"]: '',
                ["confirmPassword"]: ''
            })
        } else {
            toast.error(res.errMessage)
        }
    }
    return (
        <div className='change-password-container'>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Đổi mật khẩu</h4>
                        <form className="form-sample" style={{marginTop: '40px'}}>

                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Mật khẩu cũ</label>
                                        <div className="col-sm-8" style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword.oldPassword ? "text" : "password"}
                                                value={inputValues.oldPassword}
                                                name="oldPassword"
                                                onChange={(event) => handleOnChange(event)}
                                                className="form-control"
                                            />
                                            <span
                                                onClick={() => togglePasswordVisibility('oldPassword')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '20px',
                                                    top: '37%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%'
                                                }}
                                            >
                                                {showPassword.oldPassword ? '👁️' : '👁️‍🗨️'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Mật khẩu mới</label>
                                        <div className="col-sm-8" style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword.password ? "text" : "password"}
                                                value={inputValues.password}
                                                name="password"
                                                onChange={(event) => handleOnChange(event)}
                                                className="form-control"
                                            />
                                            <span
                                                onClick={() => togglePasswordVisibility('password')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '20px',
                                                    top: '37%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%'
                                                }}
                                            >
                                                {showPassword.password ? '👁️' : '👁️‍🗨️'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Nhập lại mật khẩu</label>
                                        <div className="col-sm-8" style={{ position: 'relative' }}>
                                            <input
                                                type={showPassword.confirmPassword ? "text" : "password"}
                                                value={inputValues.confirmPassword}
                                                name="confirmPassword"
                                                onChange={(event) => handleOnChange(event)}
                                                className="form-control"
                                            />
                                            <span
                                                onClick={() => togglePasswordVisibility('confirmPassword')}
                                                style={{
                                                    position: 'absolute',
                                                    right: '20px',
                                                    top: '37%',
                                                    transform: 'translateY(-50%)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    height: '100%'
                                                }}
                                            >
                                                {showPassword.confirmPassword ? '👁️' : '👁️‍🗨️'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-group">
                            <button type="button" onClick={() => window.location.href = '/login'} className="btn1 btn1-secondary1" style={{textAlign: 'center'}}>
                                    <i className="ti-arrow-left"></i>
                                    <span>Quay lại</span>
                                </button>
                                <button onClick={() => handleSave()} type="button" className="btn1 btn1-primary1 btn1-icon-text" style={{textAlign: 'center'}}>
                                    <i className="ti-file btn1-icon-prepend"></i>
                                    Lưu
                                </button>
                            </div>
                        </form>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ChangePassword
