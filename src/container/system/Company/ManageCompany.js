import React from 'react'
import { useEffect, useState } from 'react';
import { getAllCompany, accecptCompanyService, banCompanyService, unbanCompanyService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteModal from '../../../components/modal/NoteModal';
import { Modal, Input, Row, Col, Select } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import CommonUtils from '../../../util/CommonUtils';
const { confirm } = Modal
const ManageCompany = () => {
    const [dataCompany, setdataCompany] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [user, setUser] = useState({})
    const [search, setSearch] = useState('')
    const [censorCode, setCensorCode] = useState('')
    const [propsModal, setPropsModal] = useState({
        isActive: false,
        handleCompany: () => { },
        id: ''
    })
    const [total, setTotal] = useState(0)

    const censorOptions = [
        {
            value: '',
            label: 'Tất cả'
        },
        {
            value: 'CS1',
            label: 'Đã kiểm duyệt'
        },
        {
            value: 'CS2',
            label: 'Chưa kiểm duyệt'
        },
        {
            value: 'CS3',
            label: 'Đang chờ kiểm duyệt'
        },
    ]
    let handleOnChangeCensor = (value) => {
        setCensorCode(value)
    }
    useEffect(() => {
        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            if (userData) {
                let fetchData = async () => {
                    let arrData = []
                    arrData = await getAllCompany({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        search: CommonUtils.removeSpace(search),
                        censorCode: censorCode


                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCompany(arrData.data)
                            setTotal(arrData.count)

                        
                        setnumberPage(0)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
                setUser(userData)
            }

        } catch (error) {
            console.log(error)
        }

    }, [search, censorCode])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllCompany({
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search),
            censorCode: censorCode


        })
        if (arrData && arrData.errCode === 0) {
            setdataCompany(arrData.data)
                            setTotal(arrData.count)

            
        }
    }
    let handleBanCompany = async(id) => {
        let res = await banCompanyService({id: id})
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                            setTotal(arrData.count)

                
            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }

    let handleUnBanCompany = async(id) => {
        let res = await unbanCompanyService({id: id})
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode
            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                setTotal(arrData.count)

                
            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }

    let handleAccecptCompany = async (id, note = 'null') => {
        let res = await accecptCompanyService({
            companyId: id,
            note: note,
        })
        if (res && res.errCode === 0) {
            let arrData = await getAllCompany({
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search),
                censorCode: censorCode


            })
            if (arrData && arrData.errCode === 0) {
                setdataCompany(arrData.data)
                            setTotal(arrData.count)

                
            }
            toast.success(res.errMessage)
        } else {
            toast.error(res.errMessage)
        }
    }

    const confirmPost = (id, type) => {
        let title = type === 'ban' ? `Bạn có chắc muốn dừng hoạt động công ty này` : 
                    (type === 'unban' ? `Bạn có chắc muốn mở lại hoạt động công ty này` : 
                    (type === 'accept' ? `Bạn có chắc muốn duyệt công ty này` : 
                    `Bạn có chắc muốn quay lại trạng thái chờ cho công ty này?`));
        
        confirm({
            title: title,
            icon: <ExclamationCircleOutlined />,
            onOk() {
                if (type === 'accept') {
                    handleAccecptCompany(id);
                } else if (type === 'ban') {
                    handleBanCompany(id);
                } else {
                    handleUnBanCompany(id);
                }

            },
            onCancel() {},
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
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách công ty</h4>
                        <div style={{ fontSize: '18px', fontWeight: 'bold', paddingLeft: '2px', textTransform:'uppercase'}}><i className='fa fa-users'></i> Tổng số công ty: {total}</div>
                        <Row justify='flex-start' className='mt-4 mb-2'>
                            <Col xs={12} xxl={12} style={{ paddingRight: '150px'}}>
                                <Input.Search onSearch={handleSearch} placeholder="Nhập tên hoặc mã công ty" allowClear enterButton="Tìm kiếm">
                                </Input.Search>
                            </Col>
                            <Col xs={8} xxl={8}>
                                <label className='mr-2'>Loại kiểm duyệt: </label>
                                <Select onChange={(value) => handleOnChangeCensor(value)} style={{ width: '50%' }} size='default' defaultValue={censorOptions[0].value} options={censorOptions}>

                                </Select>
                            </Col>

                        </Row>

                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Mã công ty
                                        </th>
                                        <th>
                                            Tên công ty
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Trạng thái
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Kiểm duyệt
                                        </th>
                                        <th>
                                            Ngày khởi tạo
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCompany && dataCompany.length > 0 &&
                                        dataCompany.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '50px', paddingLeft: '28px'}}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ textAlign: 'center', width: '120px' }}>{item.id}</td>
                                                    <td>{item.name}</td>
                                                    <td style={{ textAlign: 'center'}}><label className={item.statusCompanyData.code === 'S1' ? 'badge badge-success' : 'badge badge-danger'}>{item.statusCompanyData.value}</label></td>
                                                    <td style={{ textAlign: 'center'}}><label className={item.censorData.code === 'CS1' ? 'badge badge-success' : (item.censorData.code === 'CS3'? 'badge badge-warning'  : 'badge badge-danger')}>{item.censorData.value}</label></td>
                                                    <td style={{ width: '140px', textAlign: 'center' }}>{moment(item.createdAt).format('DD-MM-YYYY')}</td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        {
                                                            item.statusCompanyData.code === 'S1' ? (
                                                            <>
                                                            <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => confirmPost(item.id,'ban')} >Dừng kích hoạt</a>
                                                                    &nbsp; &nbsp;                           
                                                            </>) : (<>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => confirmPost(item.id,'unban')} >Kích hoạt</a>
                                                                &nbsp; &nbsp;
                                                            </>)
                                                        }
                                                        <Link style={{ color: '#4B49AC' }} to={`/admin/edit-company-admin/${item.id}`}>{user?.roleCode === "ADMIN" ? 'Xem chi tiết' : 'Sửa'}</Link>
                                                        &nbsp; &nbsp;
                                                        {(item.censorData.code === 'CS3' || item.censorData.code === 'CS2') && (
                                                            <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => confirmPost(item.id,'accept')} >Duyệt</a>
                                                                &nbsp; &nbsp;
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                    isActive: true,
                                                                    handleCompany: handleAccecptCompany,
                                                                    id: item.id
                                                                })} ></a>
                                                                &nbsp; &nbsp;
                                                            </>
                                                        )}
                                                        {
                                                            item.censorData.code === 'CS1' &&
                                                            <>
                                                                <a style={{ color: '#4B49AC', cursor: 'pointer' }} onClick={() => setPropsModal({
                                                                    isActive: true,
                                                                    handleCompany: handleAccecptCompany,
                                                                    id: item.id
                                                                })}  >Quay lại trạng thái chờ</a>
                                                                &nbsp; &nbsp;
                                                            </>
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                dataCompany && dataCompany.length == 0 && (
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
                handleCompany: () => { },
                id: ''
            })} id={propsModal.id} handleFunc={propsModal.handleCompany} />
        </div >
    )
}

export default ManageCompany
