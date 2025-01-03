import React from 'react'
import { useEffect, useState } from 'react';
import { getAllListCvByPostService } from '../../../service/cvService';
import { getDetailPostByIdService } from '../../../service/userService';

import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import { Link, useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";


const ManageCv = () => {
    const [dataCv, setdataCv] = useState([])
    const [count, setCount] = useState('')
    const [numberPage, setnumberPage] = useState('')
    const { id } = useParams();
    const [post,setPost] = useState('')
    let fetchPost = async (id) => {
        let res = await getDetailPostByIdService(id)
        if (res && res.errCode === 0) {
            setPost(res.data)
        }
    }
    useEffect(() => {
        if (id) {
            try {
                let fetchData = async () => {
                    let arrData = await getAllListCvByPostService({
                        limit: PAGINATION.pagerow,
                        offset: 0,
                        postId: id
                    })
                    if (arrData && arrData.errCode === 0) {
                        setdataCv(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                fetchData();
                fetchPost(id)
            } catch (error) {
                console.log(error)
            }
        }


    }, [])

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        let arrData = await getAllListCvByPostService({


            limit: PAGINATION.pagerow,
            offset: number.selected * PAGINATION.pagerow,
            postId: id

        })
        if (arrData && arrData.errCode === 0) {
            setdataCv(arrData.data)

        }
    }
    const history = useHistory()
    return (

        <div>

            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Danh sách CV</h4>
                        <div onClick={() => history.goBack()} className='mb-2 hover-pointer' style={{ color: 'red' }}><i class="fa-solid fa-arrow-left mr-2"></i>Quay lại</div>
                        <div className='text-center'>
                            <h3 style={{marginBottom:'30px'}}>Tuyển dụng: {post && post.postDetailData.name}</h3>
                        </div>
                        <div className="table-responsive pt-2">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{width:'50px', textAlign:'center'}}>
                                            STT
                                        </th>
                                        <th style= {{textAlign:'center'}}>
                                            Tên ứng viên
                                        </th>
                                        <th style= {{textAlign:'center'}}>
                                            Email
                                        </th>
                                        <th style= {{textAlign:'center'}}>
                                            Số điện thoại
                                        </th>
                                        <th style= {{textAlign:'center'}}>
                                            Trạng thái
                                        </th>
                                        <th style= {{textAlign:'center'}}>
                                            Thao tác
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataCv && dataCv.length > 0 &&
                                        dataCv.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td style={{width:'50px', paddingLeft:'28px', textAlign:'center'}}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                    <td style={{textAlign:'center'}}>{item.userCvData.firstName + " " + item.userCvData.lastName}</td>
                                                    <td style={{textAlign:'center'}}>{item.userCvData.email}</td>
                                                    <td style={{textAlign:'center'}}>{item.userCvData.userAccountData.phonenumber}</td>
                                                    <td style={{textAlign:'center'}}>{item.isChecked === 0 ? 'Chưa xem' : 'Đã xem'}</td>
                                                    <td style={{textAlign:'center'}}>
                                                        <Link style={{ color: '#4B49AC', cursor: 'pointer' }} to={`/admin/user-cv/${item.id}/`}>Xem CV ứng viên</Link>
                                                        &nbsp; &nbsp;

                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                            {
                                            dataCv && dataCv.length == 0 && (
                                                <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom:'15px' }}>

                                        Không có dữ liệu để hiển thị!

                                    </div>
                                            )
                            }
                        </div>
                    </div>
                    <ReactPaginate
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

export default ManageCv
