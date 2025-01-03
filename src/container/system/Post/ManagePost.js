import React from 'react'
import { useEffect, useState } from 'react';
import { banPostService, getAllPostByAdminService, activePostService, getAllPostByRoleAdminService, acceptPostService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteModal from '../../../components/modal/NoteModal';
import { Col, Modal, Row, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CommonUtils from '../../../util/CommonUtils';
import {Input} from 'antd'
const {confirm} = Modal
const ManagePost = () => {
    const { id } = useParams()
    const [isSearchBy,setIsSearchBy] = useState(false)
    const [dataPost, setdataPost] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    const [search,setSearch] = useState('')
    const [censorCode,setCensorCode] = useState('PS3')
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handlePost: () => { },
        postId: ''
    })
    const [total, setTotal] = useState(0)
    const censorOptions = [
        {
            value: '',
            label: 'Tất cả'
        },
        {
            value : 'PS1',
            label: 'Đã kiểm duyệt'
        },
        {
            value: 'PS3',
            label: 'Chờ kiểm duyệt'
        },
        {
            value: 'PS4',
            label: 'Bài viết đã bị chặn'
        }
    ]
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (id && !isSearchBy) {
                setIsSearchBy(true)
                let fetchDataById = async () => {
                    setSearch(id)
                    setCensorCode('')
                    let arrDataById = await getAllPostByAdminService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        search: id,
                        censorCode: ''
                    })
                    if (arrDataById && arrDataById.errCode === 0) {
                        setdataPost(arrDataById.data)
                        setnumberPage(0)
                        setCount(Math.ceil(arrDataById.count / PAGINATION.pagerow))
                        setTotal(arrDataById.count)
                    }
                }
                fetchDataById()
            }
            else {
                if (userData) {
                    let fetchData = async () => {
                        let arrData = []
                        if (userData.roleCode == 'ADMIN') {
                            arrData = await getAllPostByRoleAdminService({
                                limit: PAGINATION.pagerow,
                                offset: 0,
                                search: CommonUtils.removeSpace(search),
                                censorCode: censorCode
                            })
                        }
                        else {
                            arrData = await getAllPostByAdminService({
                                limit: PAGINATION.pagerow,
                                offset: 0,
                                companyId: userData.companyId,
                                search: CommonUtils.removeSpace(search),
                                censorCode: censorCode
                            })
                        }
                        if (arrData && arrData.errCode === 0) {
                            setdataPost(arrData.data)
                            setnumberPage(0)
                            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                            setTotal(arrData.count)
                        }
                    }
                    fetchData();
                    setUser(userData)
                }
            }

        } catch (error) {
            console.log(error)
        }

    }, [search,censorCode])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = []
        if (user.roleCode === 'ADMIN') {
            arrData = await getAllPostByRoleAdminService({
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode

            })
        }
        else {
            arrData = await getAllPostByAdminService({
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow,
                companyId: user.companyId,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
        }
        if (arrData && arrData.errCode === 0) {
            setdataPost(arrData.data)
            setTotal(arrData.count)

        }
    }
    let handleOnChangeCensor = (value) => {
        setCensorCode(value)
    }
    let handleBanPost = async (id, note) => {
        let res = await banPostService({
            postId: id,
            userId: user.id,
            note: note
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode === 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleActivePost = async (id, note) => {
        let res = await activePostService({
            id: id,
            userId: user.id,
            note: note
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode === 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    let handleAccecptPost = async (id, note = null, statusCode = 'PS2') => {
        let res = await acceptPostService({
            id: id,
            statusCode: statusCode,
            note: note,
            userId: user.id
        })
        if (res && res.errCode === 0) {
            let arrData = []
            if (user.roleCode === 'ADMIN') {
                arrData = await getAllPostByRoleAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode

                })
            }
            else {
                arrData = await getAllPostByAdminService({
                    limit: PAGINATION.pagerow,
                    offset: numberPage * PAGINATION.pagerow,
                    companyId: user.companyId,
                    search: CommonUtils.removeSpace(search),
                    censorCode: censorCode
                })
            }
            if (arrData && arrData.errCode === 0) {
                setdataPost(arrData.data)
                setTotal(arrData.count)

            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }
    const confirmPost = (id) => {
        confirm({
            title: 'Bạn có chắc muốn duyệt bài viết này?',
            icon: <ExclamationCircleOutlined />,    
            onOk() {
                handleAccecptPost(id, '', 'PS1')
            },
        
            onCancel() {
            },
          });
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách bài đăng</h4>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', paddingLeft: '2px', paddingBottom:'20px', textTransform:'uppercase'}}> <i className="fas fa-file-alt"></i> Tổng số bài đăng: {total}</div>
                        <Row justify='flex-start' className='mt-3 mb-2'>
                            <Col xs={12} xxl={12} style={{ paddingRight: '150px'}}>
                        <Input.Search  onSearch={handleSearch} placeholder={user?.roleCode === "ADMIN" ? "Nhập tên hoặc mã bài đăng, tên công ty" :"Nhập tên hoặc mã bài đăng"} allowClear enterButton="Tìm kiếm">
                        </Input.Search>
                            </Col>
                            <Col xs={8} xxl={8}>
                                <label className='mr-2'>Loại trạng thái: </label>
                                <Select onChange={(value)=> handleOnChangeCensor(value)} style={{width:'50%'}} size='default' defaultValue={id ? censorOptions[0].value : censorOptions[3].value} options={censorOptions}>
                                    
                                </Select>
                            </Col>

                        </Row>
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{textAlign:'center'}}>
                                            STT
                                        </th>
                                        <th style={{textAlign:'center'}}>
                                            Mã bài đăng
                                        </th>
                                        <th style={{textAlign:'center'}}>
                                            Tên bài đăng
                                        </th>
                                        {
                                        user?.roleCode === 'ADMIN' &&   
                                        <th style={{textAlign:'center'}}>
                                            Tên công ty
                                        </th>
                                        }
                                        <th style={{textAlign:'center'}}>
                                            Tên người đăng
                                        </th>
                                        <th style={{textAlign:'center'}}>
                                            Hạn ứng tuyển
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Trạng thái
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataPost && dataPost.length > 0 &&
                                        dataPost.map((item, index) => {
                                            let date = moment.unix(item.timeEnd / 1000).format('DD/MM/YYYY')
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '50px', paddingLeft: '28px', textAlign:'center'}}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ textAlign: 'center', width:'100px'}}>{item.id}</td>
                                                    <td style={{textAlign:'center'}}>{item.postDetailData.name}</td>
                                                    {
                                                    user?.roleCode === "ADMIN" &&
                                                    <td style={{textAlign:'center'}}>{item.userPostData.userCompanyData.name}</td>
                                                    }
                                                    <td style={{textAlign:'center' , width:'160px'}}>{`${item.userPostData.firstName} ${item.userPostData.lastName}`}</td>
                                                    <td style={{ textAlign: 'center', width:'160px'}}>{date}</td>
                                                    <td style={{textAlign:'center'}}><label className={item.statusPostData.code === 'PS1' ? 'badge badge-success' : (item.statusPostData.code === 'PS3' ? 'badge badge-warning'  : 'badge badge-danger')}>{item.statusPostData.value}</label></td>

                                                    <td style={{ textAlign:'center', justifyContent:'space-between'}}>
                                                        <Link style={{color:'#4B49AC'}} to={`/admin/note/${item.id}`}>Chú thích</Link>
                                                        &nbsp; &nbsp;
                                                        {(user.roleCode === 'COMPANY' || user.roleCode === 'EMPLOYER') &&
                                                            <>
                                                                <Link style={{ color: '#4B49AC' }} to={`/admin/list-cv/${item.id}/`}>Xem CV ứng tuyển</Link>
                                                                &nbsp; &nbsp;
                                                            </>
                                                        }
                                                        { 
                                                        item.statusCode.code !== 'PS4' &&
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-post/${item.id}/`}>{user?.roleCode === "ADMIN" ? 'Xem chi tiết' : 'Sửa'}</Link>
                                                        }
                                                        &nbsp; &nbsp;
                                                        {user.roleCode === 'ADMIN' ? (item.statusCode === 'PS1' ? <>
                                                            <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                isActive: true,
                                                                handlePost: handleBanPost,
                                                                postId: item.id
                                                            })}  >Chặn</a>
                                                            &nbsp; &nbsp;
                                                        </>
                                                            : item.statusCode === 'PS4' ? <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                    isActive: true,
                                                                    handlePost: handleActivePost,
                                                                    postId: item.id
                                                                })}  >Mở lại</a>
                                                            </> : <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => confirmPost(item.id)}  >Duyệt</a>
                                                            </>) : <></>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataPost && dataPost.length === 0 && (
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
            <NoteModal isOpen={propsModal.isActive} onHide={() => setPropsModal({
                isActive: false,
                handlePost: () => { },
                id: ''
            })} id={propsModal.postId} handleFunc={propsModal.handlePost} />
        </div>
    )
}

export default ManagePost
