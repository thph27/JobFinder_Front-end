import React from 'react'
import { useEffect, useState } from 'react';
import { getAllUsers, BanUserService, UnbanUserService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonUtils from '../../../util/CommonUtils';
import {Input} from 'antd'

const ManageUser = () => {
    const [user, setUser] = useState({})
    const [dataUser, setdataUser] = useState([]);
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState(0)
    const [search,setSearch] = useState('')
    const [total, setTotal] = useState(0)

    let fetchAllUser = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)

        let res = await getAllUsers({
            limit: PAGINATION.pagerow,
            offset: 0,
            search: CommonUtils.removeSpace(search)
        })
        if (res && res.errCode === 0) {
            setnumberPage(0)
            setdataUser(res.data);
            setCount(Math.ceil(res.count / PAGINATION.pagerow))
            setTotal(res.count)

        }
    }
    useEffect(async () => {
        await fetchAllUser()
    }, [search])
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllUsers({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)
        })
        if (arrData && arrData.errCode === 0) {
            setdataUser(arrData.data)
            setTotal(arrData.count)
        }
    }
    let handlebanUser = async (event, item) => {
        event.preventDefault();
            let res = {}
            if (item.statusCode == 'S1')
            {
                res = await BanUserService(item.userAccountData.id)
            }
            else {
                res = await UnbanUserService(item.userAccountData.id)
            }
            if (res && res.errCode === 0) {
                toast.success(res.errMessage)
                let user = await getAllUsers({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow
                })
                if (user && user.errCode === 0) {
    
                    setdataUser(user.data);
                    setTotal(user.count)
                    setCount(Math.ceil(user.count / PAGINATION.pagerow))
                }
                await fetchAllUser()
            } else {
                toast.error(res.errMessage)
            }
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách người dùng</h4>
                        <div style={{fontSize: '18px', fontWeight: 'bold', paddingLeft: '2px', textTransform:'uppercase'}}> <i className="fas fa-user"></i> Tổng số người dùng: {total}</div>
                        <Input.Search onSearch={handleSearch} className='mt-4 mb-1' placeholder="Nhập tên hoặc số điện thoại" allowClear enterButton="Tìm kiếm">
                                    
                        </Input.Search>
                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>
                                            STT
                                        </th>
                                        <th style={{textAlign: 'center' }}>
                                            Họ và Tên
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Số điện thoại
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Giới tính
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Ngày sinh
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Quyền
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Trạng thái
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataUser && dataUser.length > 0 &&
                                        dataUser.map((item, index) => {
                                            let date = item.userAccountData.dob ? moment.unix(item.userAccountData.dob / 1000).format('DD/MM/YYYY') : 'Không có thông tin'
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '4%', textAlign: 'center' }}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ width: '20%', textAlign: 'center' }}>{`${item.userAccountData.firstName} ${item.userAccountData.lastName}`}</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>{item.phonenumber}</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>{item.userAccountData.genderData.value}</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>{date}</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>{item.roleData.value}</td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}><label className={item.statusCode === 'S1' ? 'badge badge-success' : 'badge badge-danger'}>{item.statusAccountData.value}</label></td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-user/${item.userAccountData.id}/`}><i className='fa fa-edit'></i></Link>
                                                        &nbsp; &nbsp;
                                                        {user.id !== item.id && <button 
                                                            style={{ color: item.statusCode === 'S1' ? 'red' : '#4B49AC', border: 'none', background: 'none', cursor: 'pointer' }} 
                                                            onClick={(event) => handlebanUser(event, item)}
                                                        >
                                                            {item.statusCode === 'S1' ? 
                                                                <i className='fa fa-lock' style={{paddingLeft:'10px'}}></i> : 
                                                                <i className='fa fa-check' style={{color: '#4B49AC',paddingLeft:'10px'}}></i>
                                                            }
                                                        </button>}
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataUser && dataUser.length == 0 && (
                                                <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom:'15px' }}>

                                                    Không có dữ liệu để hiển thị!

                                                </div>
                                            )
                                        }
                        </div>
                    </div>
                    <ReactPaginate
                        forcePage={numberPage}
                        previousLabel={'Quay lại'}
                        nextLabel={'Tiếp'}
                        breakLabel={'...'}
                        pageCount={count}
                        marginPagesDisplayed={3}
                        containerClassName={"pagination justify-content-center pb-3"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link"}
                        previousLinkClassName={"page-link"}
                        previousClassName={"page-item"}
                        nextClassName={"page-item"}
                        nextLinkClassName={"page-link"}
                        breakLinkClassName={"page-link"}
                        breakClassName={"page-item"}
                        activeClassName={"active"}
                        onPageChange={handleChangePage}
                    />
                </div>

            </div>
        </div>
    )
}

export default ManageUser
