import React from 'react'
import { useEffect, useState } from 'react';
import {  getPaymentLinkCv, getAllToSelect } from '../../../service/userService';
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";
import { Spinner, Modal } from 'reactstrap'
import './BuyCv.css';
const BuyCv = () => {
    const history = useHistory()
    const [inputValues, setInputValues] = useState({
       amount: 1, packageCvId: ''
    });
    const [isLoading, setIsLoading] = useState(false)
    const [dataPackage, setDataPackage] = useState([])
    const [price, setPrice] = useState(0)
    const [total, setTotal] = useState(0)
    const handleOnChangePackage = event => {
        const { value } = event.target;
        let item = dataPackage.find(item => item.id == value)
        setPrice(item.price)
        setTotal(item.price * inputValues.amount)
        setInputValues({
            ...inputValues,
            packageCvId: item.id
        })
    };
    const handleOnChangeAmount = event => {
        const { value } = event.target
        setInputValues({
            ...inputValues,
            amount: value
        })
        setTotal(value * price)
    }

    const handleBuy = async() => {
        setIsLoading(true)
        let res = await getPaymentLinkCv(inputValues.packageCvId , inputValues.amount)
        if (res.errCode == 0) {
            let data = {
                packageCvId: inputValues.packageCvId,
                amount : inputValues.amount,
                userId: JSON.parse(localStorage.getItem('userData')).id
            }
            localStorage.setItem("orderCvData", JSON.stringify(data))
            window.location.href = res.link
        }
        else {
            toast.error(res.errMessage)
            setIsLoading(false)
        }
    }
    const fetchPackagePost = async()=> {
        let res = await getAllToSelect()
        setDataPackage(res.data)
        setInputValues({
            ...inputValues,
            packageCvId: res.data[0].id
        })
        setPrice(res.data[0].price)
        setTotal(res.data[0].price * inputValues.amount)
    }
    useEffect(() => {
        fetchPackagePost()
    }, [])
    return (
        <div className='bill-container'>
            <div className="bill-header">
                <h4>Hóa Đơn Mua Lượt Xem Hồ Sơ Ứng Viên</h4>
            </div>
            
            <div className="bill-row">
                <span className="bill-label">Gói xem hồ sơ ứng viên</span>
                <select className="bill-select" onChange={handleOnChangePackage}>
                    {dataPackage && dataPackage.length > 0 &&
                        dataPackage.map((item, index) => (
                            <option key={index} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="bill-row">
                <span className="bill-label">Đơn giá</span>
                <span className="bill-value">{price} USD</span>
            </div>

            <div className="bill-row">
                <span className="bill-label">Số lượng</span>
                <input 
                    className="bill-input"
                    type="number"
                    value={inputValues.amount}
                    onChange={handleOnChangeAmount}
                />
            </div>

            <div className="bill-total">
                <div className="bill-row">
                    <span className="bill-label">Tổng tiền</span>
                    <span className="bill-value">{total} USD</span>
                </div>
            </div>

            <button className="buy-button" onClick={handleBuy}>
                <i className="ti-file btn1-icon-prepend" style={{marginRight:'10px'}}></i>
                Thanh Toán
            </button>

            {isLoading && 
                <Modal isOpen='true' centered contentClassName='closeBorder'>
                    <div style={{
                        position: 'absolute', 
                        right: '50%',
                        justifyContent: 'center', 
                        alignItems: 'center'
                    }}>
                        <Spinner animation="border"></Spinner>
                    </div>
                </Modal>
            }
        </div>
    )
}

export default BuyCv
