import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createNewUser } from '../../service/userService';
import { useFetchAllcode } from '../../util/fetch';
import { Link } from 'react-router-dom'

const Register = () => {
    const [inputValidates, setValidates] = useState({
        phonenumber: true, firstName: true, lastName: true, email: true
    })
    const [inputValues, setInputValues] = useState({
        phonenumber: '', firstName: '', lastName: '', isOpen: false, dataUser: {}, roleCode: '', email: '', genderCode: ''
    });
    
    let { data: dataRole } = useFetchAllcode('ROLE');
    let { data: dataGender } = useFetchAllcode('GENDER');

    if (dataRole && dataRole.length > 0) {
        dataRole = dataRole.filter(item => item.code !== "ADMIN" && item.code !== "COMPANY")
    }
    
    if (dataGender && dataGender.length > 0 && inputValues.genderCode === '' && dataRole && dataRole.length > 0 && inputValues.roleCode === '') {
        setInputValues({ ...inputValues, ["genderCode"]: dataGender[0].code, ["roleCode"]: dataRole[0].code })
    }

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    const handleRegister = async () => {
        let isValid = true;
        let validates = {
            phonenumber: true,
            firstName: true,
            lastName: true,
            email: true
        };

        if (!inputValues.firstName) {
            validates.firstName = "Vui lòng nhập họ";
            isValid = false;
        }
        if (!inputValues.lastName) {
            validates.lastName = "Vui lòng nhập tên";
            isValid = false;
        }
        if (!inputValues.phonenumber) {
            validates.phonenumber = "Vui lòng nhập số điện thoại";
            isValid = false;
        }
        if (!inputValues.email) {
            validates.email = "Vui lòng nhập email";
            isValid = false;
        }

        setValidates(validates);

        if (isValid) {
            try {
                const res = await createNewUser({
                    firstName: inputValues.firstName,
                    lastName: inputValues.lastName,
                    phonenumber: inputValues.phonenumber,
                    email: inputValues.email,
                    roleCode: inputValues.roleCode,
                    genderCode: inputValues.genderCode,
                    image: 'https://res.cloudinary.com/thph27/image/upload/v1733655981/cxbnwwehf6gk5oszmocr.png'
                });

                if (res && res.errCode === 0) {
                    toast.success("Tạo tài khoản thành công. Vui lòng kiểm tra email để nhận mật khẩu", {
                        autoClose: 10000
                    });
                    window.location.href = "/login";
                } else {
                    toast.error(res.errMessage, {
                        autoClose: 5000
                    });
                }
            } catch (error) {
                toast.error("Đăng ký thất bại: " + error.message, {
                    autoClose: 5000
                });
                console.log(error);
            }
        }
    };

    return (
        <div className="container-scroller">
            <div className="container-fluid page-body-wrapper full-page-wrapper">
                <div className="content-wrapper d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-4 mx-auto">
                            <div className="auth-form-light text-left py-5 px-4 px-sm-5" style={{border: '1px solid #fff', borderRadius: '12px'}}>
                                <div className="brand-logo" style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <img src="/assets/img/logo/logoNew.png" alt="logo" style={{width: '120px', height: 'auto'}}/>
                                </div>
                                <h4>Bạn chưa có tài khoản?</h4>
                                <h6 className="font-weight-light">Đăng ký dễ dàng chỉ vài bước đơn giản</h6>
                                <form className="pt-3">
                                    <div className="form-group">
                                        <input type="text" value={inputValues.firstName} name="firstName" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" placeholder="Họ" />
                                        {inputValidates.firstName && <p style={{ color: 'red' }}>{inputValidates.firstName}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" value={inputValues.lastName} name="lastName" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" placeholder="Tên" />
                                        {inputValidates.lastName && <p style={{ color: 'red' }}>{inputValidates.lastName}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input type="number" value={inputValues.phonenumber} name="phonenumber" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" placeholder="Số điện thoại" />
                                        {inputValidates.phonenumber && <p style={{ color: 'red' }}>{inputValidates.phonenumber}</p>}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" value={inputValues.email} name="email" onChange={(event) => handleOnChange(event)} className="form-control form-control-lg" placeholder="Email" />
                                        {inputValidates.email && <p style={{ color: 'red' }}>{inputValidates.email}</p>}
                                    </div>
                                    <div className="form-group">
                                        <select style={{color:'black'}} className="form-control" value={inputValues.roleCode} name="roleCode" onChange={(event) => handleOnChange(event)}>
                                            {dataRole && dataRole.length > 0 &&
                                                dataRole.map((item, index) => {
                                                    if (item.code !== "ADMIN" && item.code !== "COMPANY") {
                                                        return (
                                                            <option key={index} value={item.code}>{item.value}</option>
                                                        )
                                                    }
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select style={{color: "black"}} className="form-control" value={inputValues.genderCode} name="genderCode" onChange={(event) => handleOnChange(event)}>
                                            {dataGender && dataGender.length > 0 &&
                                                dataGender.map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.code}>{item.value}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mt-3">
                                        <a onClick={handleRegister} className="btn1 btn1-block btn1-primary1 btn1-lg font-weight-medium auth-form-btn1" style={{textTransform: 'uppercase'}}>
                                            Đăng ký
                                        </a>
                                    </div>
                                    <div className="text-center mt-4 font-weight-light">
                                        Bạn đã có tài khoản rồi? <Link to="/login" className="text-primary">Đăng nhập ngay</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
