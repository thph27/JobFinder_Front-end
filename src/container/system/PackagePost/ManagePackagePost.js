import React from 'react'
import { useEffect, useState } from 'react';
import { getAllPackage, setActiveTypePackage } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import CommonUtils from '../../../util/CommonUtils';
import {Input} from 'antd'
const ManagePackagePost = () => {
    const [dataPackagePost, setDataPackagePost] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [search,setSearch] = useState('')

    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getAllPackage({
                    limit: PAGINATION.pagerow,
                    offset: 0,
                    search: CommonUtils.removeSpace(search)

                })
                if (arrData && arrData.errCode === 0) {
                    setDataPackagePost(arrData.data)
                    setnumberPage(0)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [search])
    let hanndleSetActivePackage = async (event,id, isActive) => {
        event.preventDefault();
        let res = await setActiveTypePackage({
            id: id,
            isActive: isActive
        })
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let arrData = await getAllPackage({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search)

            })
            if (arrData && arrData.errCode === 0) {
                setDataPackagePost(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error(res.errMessage)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllPackage({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)

        })
        if (arrData && arrData.errCode === 0) {
            setDataPackagePost(arrData.data)

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
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách các gói bài đăng</h4>
                        <Input.Search onSearch={handleSearch} className='mt-3 mb-2' placeholder="Nhập tên gói bài đăng" allowClear enterButton="Tìm kiếm">
                                    
                                    </Input.Search>
                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Tên gói
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Giá trị
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Giá tiền
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Loại
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
                                    {dataPackagePost && dataPackagePost.length > 0 &&
                                        dataPackagePost.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '50px', paddingLeft: '28px', textAlign: 'center' }}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.value}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.price} USD</td>
                                                    <td style={{ textAlign: 'center' }}>{item.isHot === 0 ? 'Gói bình thường' : 'Gói nổi bật'}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.isActive === 0 ? 'Dừng kinh doanh' : 'Đang kinh doanh'}</td>
                                                    <td style={{ width: '200px', textAlign: 'center' }}>
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-package-post/${item.id}/`}>
                                                            <i className='fa fa-edit' style={{paddingLeft:'10px'}}></i>
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                        {item.isActive === 1 ? (
                                                            <>
                                                                <button 
                                                                    style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }} 
                                                                    onClick={(event) => hanndleSetActivePackage(event,item.id,0)} 
                                                                >
                                                                    <i className='fa fa-lock' style={{paddingLeft:'10px'}}></i>
                                                                </button>
                                                            </>) : (<>
                                                                <button 
                                                                    style={{ color: '#4B49AC', border: 'none', background: 'none', cursor: 'pointer' }} 
                                                                    onClick={(event) => hanndleSetActivePackage(event,item.id,1)} 
                                                                >
                                                                    <i className='fa fa-check' style={{paddingLeft:'10px'}}></i>
                                                                </button>
                                                            </>)
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataPackagePost && dataPackagePost.length === 0 && (
                                                <div style={{ textAlign: 'center', paddingTop: '15px' }}>

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

export default ManagePackagePost
