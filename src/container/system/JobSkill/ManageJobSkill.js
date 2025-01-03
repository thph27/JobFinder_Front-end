import React from 'react'
import { useEffect, useState } from 'react';
import { DeleteSkillService, getListSkill } from '../../../service/userService';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import {Input, Modal, Row, Col, Select} from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useFetchAllcode } from '../../../util/fetch';
const {confirm} = Modal

const ManageJobSkill = () => {
    const [dataJobSkill, setdataJobSkill] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const [search,setSearch] = useState('')
    const [categoryJobCode,setCategoryJobCode] = useState('')
    const [total, setTotal] = useState(0)
    useEffect(() => {
        try {
            let fetchData = async () => {
                let arrData = await getListSkill({
                    categoryJobCode: categoryJobCode,
                    limit: PAGINATION.pagerow,
                    offset: 0,
                    search: CommonUtils.removeSpace(search)
                })
                if (arrData && arrData.errCode === 0) {
                    setnumberPage(0)
                    setdataJobSkill(arrData.data)
                    setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    setTotal(arrData.count)
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [search,categoryJobCode])

    let { data: listCategoryJobCode } = useFetchAllcode('JOBTYPE');
    listCategoryJobCode = listCategoryJobCode.map(item=> ({
        value: item.code,
        label: item.value
    }))
    listCategoryJobCode.unshift({
        value: '',
        label: 'Tất cả'
    })

    let handleDeleteJobSkill = async (id) => {
        let res = await DeleteSkillService(id)
        if (res && res.errCode === 0) {
            toast.success(res.errMessage)
            let arrData = await getListSkill({
                categoryJobCode: '',
                limit: PAGINATION.pagerow,
                offset: numberPage * PAGINATION.pagerow,
                search: CommonUtils.removeSpace(search)
            })
            if (arrData && arrData.errCode === 0) {
                setdataJobSkill(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }

        } else toast.error(res.errMessage)
    }
    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getListSkill({

            categoryJobCode: categoryJobCode,
            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            search: CommonUtils.removeSpace(search)

        })
        if (arrData && arrData.errCode === 0) {
            setdataJobSkill(arrData.data)

        }
    }
    let handleOnChangeCategoryJobCode = async(value) => {
        setCategoryJobCode(value)
    }
    const handleSearch = (value) => {
        setSearch(value)
    }
    const confirmDelete = (id) => {
        confirm({
            title: 'Bạn có chắc muốn xóa kĩ năng này?',
            icon: <ExclamationCircleOutlined />,    
            onOk() {
                handleDeleteJobSkill(id)
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
                        <h4 className="card-title" style={{textTransform:'uppercase'}}>Danh sách các chuyên môn</h4>
                        <Row justify='start' className='mt-4 mb-0'>
                            <Col xs={12} xxl={12}>
                        <Input.Search  onSearch={handleSearch} placeholder="Nhập tên chuyên môn " allowClear enterButton="Tìm kiếm">
                        </Input.Search>
                            </Col>
                            <Col xs={8} xxl={8} style={{marginLeft:'150px'}}>
                                <label className='mr-2'>Lọc theo ngành nghề: </label>
                                <Select onChange={(value)=> handleOnChangeCategoryJobCode(value)} defaultValue={listCategoryJobCode[0]} style={{width:'50%'}} size='default' options={listCategoryJobCode ? listCategoryJobCode : []}>
                                    
                                </Select>
                            </Col>

                        </Row>
                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center' }}>
                                            STT
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Tên chuyên môn
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Ngành nghề
                                        </th>
                                        <th style={{ textAlign: 'center' }}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataJobSkill && dataJobSkill.length > 0 &&
                                        dataJobSkill.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: '50px', paddingLeft:'26px', textAlign: 'center' }}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{ width: '500px', textAlign: 'center' }}>{item.name}</td>
                                                    <td style={{ textAlign: 'center' }}>{item.jobTypeSkillData.value}</td>
                                                    <td style={{ width: '100px', textAlign: 'center' }}>
                                                        <Link style={{ color: '#4B49AC', marginRight: '10px' }} to={`/admin/edit-job-skill/${item.id}/`}><i className='fa fa-edit'></i></Link>
                                                        &nbsp; &nbsp;
                                                        <button 
                                                            style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }} 
                                                            onClick={(event) => confirmDelete(item.id)}
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
                                            dataJobSkill && dataJobSkill.length == 0 && (
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

export default ManageJobSkill
