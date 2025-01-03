import React from 'react'
import { useEffect, useState } from 'react';
import { DeleteAllcodeService, getListAllCodeService } from '../../../service/userService';
import moment from 'moment';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import {Input, Modal} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
const {confirm} = Modal

const ManageJobType = () => {
    const [dataJobType, setdataJobType] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [imgPreview, setimgPreview] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [search,setSearch] = useState('')
    const [total, setTotal] = useState(0)
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListAllCodeService({
                    type: 'JOBTYPE',
                    limit: PAGINATION.pagerow,
                    offset: 0,
                    search: CommonUtils.removeSpace(search)
                })
                if (arrData && arrData.errCode === 0) {
                    setnumberPage(0)
                    setdataJobType(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    setTotal(arrData.count)
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [search])
    let openPreviewImage = (url) => {
        setimgPreview(url);
        setisOpen(true);
    }
    let handleDeleteJobType = async (id) => {
        let res = await DeleteAllcodeService(id)
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let arrData = await getListAllCodeService({
                type: 'JOBTYPE',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search)
            })
            if (arrData && arrData.errCode === 0) {
                setdataJobType(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error(res.errMessage)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListAllCodeService({

            type: 'JOBTYPE',
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)

        })
        if (arrData && arrData.errCode === 0) {
            setdataJobType(arrData.data)

        }
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    const confirmDelete = (id) => {
        confirm({
            title: 'Bạn có chắc muốn xóa lĩnh vực này này?',
            icon: <ExclamationCircleOutlined />,    
            onOk() {
                handleDeleteJobType(id)
            },
        
            onCancel() {
            },
          });
    }
    return (
        <div>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách các ngành nghề</h4>
                        <div style={{fontSize: '18px', fontWeight: 'bold', paddingLeft: '2px'}}> 
                            <i className="fas fa-industry"></i> Tổng số ngành nghề: {total}
                        </div>
                        <Input.Search onSearch={handleSearch} className='mt-4 mb-2' placeholder="Nhập tên ngành nghề" allowClear enterButton="Tìm kiếm">
                                    
                                    </Input.Search>
                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>
                                            STT
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Tên ngành nghề
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Mã code
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Hình ảnh minh họa
                                        </th>
                                        <th style={{ textAlign: 'center'}}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJobType && dataJobType.length > 0 &&
                                        dataJobType.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '4%', textAlign: 'center' }}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ width: '30%', textAlign: 'center' }}>{item.value}</td>
                                                    <td style={{ width: '20%', textAlign: 'center' }}>{item.code}</td>
                                                    <td style={{ width: '30%' }} ><div onClick={() => openPreviewImage(item.image)} className="box-img-preview" style={{ backgroundImage: `url(${item.image})`, width: '100%' }}></div></td>
                                                    <td style={{ width: '10%', textAlign: 'center' }}>
                                                        <Link style={{ color: '#4B49AC', paddingLeft:'10px' }} to={`/admin/edit-job-type/${item.code}/`}><i className='fa fa-edit'></i></Link>
                                                        &nbsp; &nbsp;
                                                        <button 
                                                            style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }} 
                                                            onClick={(event) => confirmDelete(item.code)}
                                                        >
                                                            <i className='fa fa-trash' style={{paddingLeft:'10px'}}></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataJobType && dataJobType.length == 0 && (
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
            {
                isOpen === true &&
                <Lightbox mainSrc={imgPreview}
                    onCloseRequest={() => setisOpen(false)}
                />
            }
        </div>
    )
}

export default ManageJobType
