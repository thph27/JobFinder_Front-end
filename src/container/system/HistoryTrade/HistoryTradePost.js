import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { PAGINATION } from '../../../util/constant';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { DatePicker } from 'antd';
import CommonUtils from '../../../util/CommonUtils';
import { getHistoryTradePost } from '../../../service/userService';
const HistoryTradePost = () => {
    const { RangePicker } = DatePicker;
    const [user, setUser] = useState({})
    const [dataSum,setDataSum] = useState(0)
    const [fromDatePost,setFromDatePost] = useState('')
    const [toDatePost,setToDatePost] = useState('')



    const [data, setData] = useState([])
    const [count, setCount] = useState('')

    const [numberPage, setnumberPage] = useState('')

    let sendParams = {
        limit: PAGINATION.pagerow,
        offset: 0,
        fromDate: '',
        toDate: '',
        companyId: user.companyId
    }

    let getData = async (params) => {

        let arrData = await getHistoryTradePost(params)
        if (arrData && arrData.errCode === 0) {
            setData(arrData.data)
            setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
        }
    }

    let onDatePicker = async (values) => {
        let fromDate =''
        let toDate = ''
        if (values) {
            fromDate = values[0].format('YYYY-MM-DD')
            toDate = values[1].format('YYYY-MM-DD')
        }
        getData({
            ...sendParams,
            fromDate,
            toDate,
            offset: 0
        })
        setFromDatePost(fromDate)
        setToDatePost(toDate)
    }

    let handleChangePage = async (number) => {
        setnumberPage(number.selected)
        getData({
            ...sendParams,
            offset: number.selected * PAGINATION.pagerow
        })
    }
    let handleOnClickExport =async ()=>{
        let res = await getHistoryTradePost({
            ...sendParams,
            limit: '',
            offset: '',
            fromDate: fromDatePost,
            toDate: toDatePost
        })
        if(res.errCode === 0){
            let formatData = res.data.map((item)=> {
                let obj = {
                    'Tên gói': item.packageOrderData.name,
                    'Mã giao dịch': item.id,
                    'Loại gói': item.packageOrderData.isHot == 0 ? "Loại bình thường" : "Loại nổi bật",
                    'Số lượng mua': item.amount,
                    'Đơn giá': item.packageOrderData.price + " USD",
                    'Tên người mua': item.userOrderData.firstName + ' ' + item.userOrderData.lastName,
                    'Thời gian mua': moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')
                }
                return obj
            })
            console.log(formatData)
            await CommonUtils.exportExcel(formatData,"History Trade Post","History Trade Post")
        }
        
    }

    useEffect(async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)

        getData({...sendParams,companyId: userData.companyId})
    }, [])

    return (
                
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Lịch sử thanh toán các gói bài đăng</h4>
                            <button  style={{float:'right', borderRadius:'5px'}} onClick={() => handleOnClickExport()} >Xuất file excel <i class="fa-solid fa-file-excel"></i></button>
                            <RangePicker onChange={onDatePicker}
                                format={'DD/MM/YYYY'}
                            ></RangePicker>


                            <div className="table-responsive pt-2">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'center' }}>
                                                STT
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Tên gói
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Mã giao dịch
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Loại gói
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Số lượng đã mua
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Đơn giá
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Người mua
                                            </th>
                                            <th style={{ textAlign: 'center' }}>
                                                Thời gian mua
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data && data.length > 0 &&
                                            data.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td style={{ textAlign: 'center' }}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.packageOrderData.name}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.id}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.packageOrderData.isHot == 0 ? "Loại bình thường" : "Loại nổi bật"}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.amount}</td>
                                                        <td style={{ textAlign: 'center' }}>{item.packageOrderData.price} USD</td>
                                                        <td style={{ textAlign: 'center' }}>{item.userOrderData.firstName + ' ' + item.userOrderData.lastName }</td>
                                                        <td style={{ textAlign: 'center' }}>{moment(item.createdAt).format('DD-MM-YYYY HH:mm:ss')}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                        {
                                            data && data.length == 0 && (
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

    )
}

export default HistoryTradePost
