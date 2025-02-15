import React from 'react'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getStatisticalTypePost, getStatisticalPackagePost, getStatisticalPackageCv } from '../../service/userService';
import { getStatisticalCv } from '../../service/cvService';
import { PAGINATION } from '../../util/constant';
import { PieChart } from 'react-minimal-pie-chart';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { DatePicker } from 'antd';
import CommonUtils from '../../util/CommonUtils';
import './Home.css'
import Chatbot from '../../components/Chatbot/Chatbot';

const Home = () => {
    const { RangePicker } = DatePicker;
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formattedToday = yyyy + '-' + mm + '-' + dd;
    const [user, setUser] = useState({})
    const [dataStatisticalTypePost, setDataStatisticalTypePost] = useState([])
    const [dataStatisticalPackagePost, setDataStatisticalPackagePost] = useState([])
    const [dataStatisticalPackageCv, setDataStatisticalPackageCv] = useState([])
    const [dataSum,setDataSum] = useState(0)
    const [dataSumCv,setDataSumCv] = useState(0)
    const [formDatePost,setFormDatePost] = useState(formattedToday)
    const [formDateCv,setFormDateCv] = useState(formattedToday)
    const [toDatePost,setToDatePost] = useState(formattedToday)
    const [toDateCv,setToDateCv] = useState(formattedToday)


    const [dataCv, setDataCv] = useState([])
    const [count, setCount] = useState('')
    const [countCv, setCountCv] = useState('')

    const [numberPage, setnumberPage] = useState('')
    const [numberPageCv, setnumberPageCv] = useState('')

    let sendParams = {
        limit: PAGINATION.pagerow,
        offset: 0,
        fromDate: formattedToday,
        toDate: formattedToday,
        companyId: user.companyId
    }

    let getStatistical = async(fromDate,toDate,type='packageCv') => {
        let arrData = []
        if (type==='packagePost') {
            setFormDatePost(fromDate)
            arrData = await getStatisticalPackagePost({
                fromDate,
                toDate,
                limit: PAGINATION.pagerow,
                offset: 0,
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackagePost(arrData.data)
                setDataSum(arrData.sum)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            setFormDateCv(fromDate)
            arrData = await getStatisticalPackageCv({
                fromDate,
                toDate,
                limit: PAGINATION.pagerow,
                offset: 0,
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackageCv(arrData.data)
                setDataSumCv(arrData.sum)
                setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        }
    }

    let onDatePicker = async (values,type='') => {
        let fromDate = formattedToday
        let toDate = formattedToday
        if (values) {
            fromDate = values[0].format('YYYY-MM-DD')
            toDate = values[1].format('YYYY-MM-DD')
        }
        if (user.roleCode !== "ADMIN") {
            let arrData = await getStatisticalCv({
                ...sendParams,
                fromDate,
                toDate,
                offset: 0
            })
            if (arrData && arrData.errCode === 0) {
                setDataCv(arrData.data)
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        }
        else {
            getStatistical(fromDate,toDate,type)
        }
    }
    let getStatisticalChangePage= async(type,number) => {
        let arrData = []
        if (type ==='packagePost') {
            setnumberPage(number.selected)
            arrData = await getStatisticalPackagePost({
                fromDate: formattedToday,
                toDate: formattedToday,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackagePost(arrData.data)
                setDataSum(arrData.sum)
    
                setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        } else {
            setnumberPageCv(number.selected)
            arrData = await getStatisticalPackageCv({
                fromDate: formattedToday,
                toDate: formattedToday,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataStatisticalPackageCv(arrData.data)
                setDataSumCv(arrData.sum)
                setCountCv(Math.ceil(arrData.count / PAGINATION.pagerow))
            }
        }
    }
    let handleChangePage = async (number,type='') => {
        if (user.roleCode !== "ADMIN") {
            setnumberPage(number.selected)
            let arrData = await getStatisticalCv({
                ...sendParams,
                limit: PAGINATION.pagerow,
                offset: number.selected * PAGINATION.pagerow
            })
            if (arrData && arrData.errCode === 0) {
                setDataCv(arrData.data)
            }
        }
        else {
            getStatisticalChangePage(type,number)
        }
    }
    let handleOnClickExport =async (type) =>{
        let res = []
        if (type === 'packagePost') {
            res = await getStatisticalPackagePost({
                fromDate: formDatePost,
                toDate: toDatePost,
                limit: '',
                offset: ''
            })
        }
        else {
            res = await getStatisticalPackageCv({
                fromDate: formDateCv,
                toDate: toDateCv,
                limit: '',
                offset: ''
            })
        }
        if(res.errCode === 0){
            let formatData = res.data.map(item=> {
                let obj = {
                    'Mã gói': item.id,
                    'Tên gói': item.name,
                    'Loại gói':item.isHot === 1 ? 'Loại nổi bật' : 'Loại bình thường',
                    'Số lượng': +item.count,
                    'Tổng': +item.total+'USD'
                }
                if (type !== 'packagePost') delete obj['Loại gói']
                return obj
            })
            if (type === 'packagePost') {
                await CommonUtils.exportExcel(formatData,"Statistical Package Post","Statistical Package Post")
            }
            else {
                await CommonUtils.exportExcel(formatData,"Statistical Package Candiate","Statistical Package Candiate")
            }
        }
        
    }


    const getData = async (limit) => {
        let res = await getStatisticalTypePost(limit)
        let other = res.totalPost
        let otherPercent = 100
        let color = ['red', 'yellow', 'green', 'blue', 'orange']
        if (res.errCode === 0) {
            let newdata = res.data.map((item, index) => {
                other -= item.amount
                otherPercent -= Math.round((item.amount / res.totalPost * 100) * 100) / 100
                return {
                    title: item.postDetailData.jobTypePostData.value,
                    value: Math.round((item.amount / res.totalPost * 100) * 100) / 100,
                    color: color[index],
                    amount: item.amount
                }
            })
            if (other > 0) {
                newdata.push({ title: "Lĩnh vực khác", value: Math.round(otherPercent * 100) / 100, color: color[4], amount: other })
            }
            setDataStatisticalTypePost(newdata)
        }
        else toast.error(res.message)
    }
    useEffect(async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        setUser(userData)
        getData(4)
    }, [])

    useEffect(() => {
        try {
            let fetchData = async () => {
                const userData = JSON.parse(localStorage.getItem('userData'));
                if (userData.roleCode !== "ADMIN") {
                    let arrData = await getStatisticalCv({
                        ...sendParams,
                        companyId: userData.companyId
                    })
                    if (arrData && arrData.errCode === 0) {
                        setDataCv(arrData.data)
                        setCount(Math.ceil(arrData.count / PAGINATION.pagerow))
                    }
                }
                else {
                    getStatistical(formattedToday,formattedToday,'packagePost')
                    getStatistical(formattedToday,formattedToday,'packageCv')
                }
            }
            fetchData();
        } catch (error) {
            console.log(error)
        }

    }, [])
    return (
        <>
            <div className="row">
                <div className="col-md-12 grid-margin">
                    <div className="row">
                        <div className="col-12 col-xl-8 mb-4 mb-xl-0">
                            <h3 className="font-weight-bold" style={{fontSize:'30px', paddingTop:'20px'}}>Xin chào, <span style={{textTransform:'uppercase'}}>{user.firstName + " " + user.lastName}</span></h3>
                        </div>

                    </div>
                </div>
            </div>
            <div className="statistics-wrapper">
                <div className="statistics-section">
                <h2 className="statistics-title">Biểu đồ thống kê các lĩnh vực nổi bật</h2>
                    <div className="statistics-container">
                        <div className="legend-container">
                            {dataStatisticalTypePost.map((item, index) => (
                                <div key={index} className="legend-item">
                                    <div 
                                        className="legend-color" 
                                        style={{ backgroundColor: item.color }}
                                    ></div>
                                    <span className="legend-text">
                                        {item.title}: {item.amount} bài
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="chart-container">
                            <PieChart
                                label={({ x, y, dx, dy, dataEntry }) => (
                                    <text
                                        x={x}
                                        y={y}
                                        dx={dx}
                                        dy={dy}
                                        dominantBaseline="central"
                                        textAnchor="middle"
                                        style={{ 
                                            fontSize: '3px',
                                            fill: '#fff',
                                            fontWeight: 'bold',
                                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                                        }}
                                    >
                                        {`${dataEntry.value}%`}
                                    </text>
                                )}
                                data={dataStatisticalTypePost}
                                lineWidth={60}
                                radius={35}
                                labelPosition={65}
                                animate={true}
                                animationDuration={800}
                                animationEasing="ease-out"
                                labelStyle={{
                                    fontSize: '5px',
                                    fontFamily: 'sans-serif',
                                    fill: '#fff'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                user.companyId &&
                <div className="col-12 grid-margin" style={{marginTop:'60px'}}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bảng thông kê số lượng bài đăng</h4>
                            <RangePicker onChange={(values)=>onDatePicker(values)}></RangePicker>
                            <div className=" pt-2">
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
                                            <th style={{textAlign:'center'}}>
                                                Người đăng
                                            </th>
                                            <th style={{textAlign:'center'}}>
                                                Ngày đăng
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataCv && dataCv.length > 0 &&
                                            dataCv.map((item, index) => {
                                                let date = moment.unix(item.timePost / 1000).format('DD/MM/YYYY')

                                                return (
                                                    <tr key={index}>
                                                        <td style={{textAlign:'center'}}>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td style={{textAlign:'center'}}>{item.id}</td>
                                                        <td style={{textAlign:'center'}}>{item.postDetailData.name}</td>
                                                        <td style={{textAlign:'center'}}>{item.userPostData.firstName + " " + item.userPostData.lastName}</td>
                                                        <td style={{textAlign:'center'}}>{date}</td>
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
                            onPageChange={(number) => handleChangePage(number)}
                        />
                    </div>

                </div>
            }
            {
                user.roleCode === 'ADMIN' &&
                <>
                <div className="col-12 grid-margin" style={{paddingTop:'40px'}}>
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bảng thống kê doanh thu các gói bài đăng</h4>
                            <button  style={{float:'right', borderRadius:'5px'}} onClick={() => handleOnClickExport('packagePost')} >Xuất file excel <i class="fa-solid fa-file-excel"></i></button>
                            <RangePicker onChange={(values)=>onDatePicker(values,'packagePost')}
                                format={'DD/MM/YYYY'}
                            ></RangePicker>


                            <div className="table-responsive pt-2">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                STT
                                            </th>
                                            <th>
                                                Tên gói
                                            </th>
                                            <th>
                                                Mã gói
                                            </th>
                                            <th>
                                                Loại gói
                                            </th>
                                            <th>
                                                Số lượng đã bán
                                            </th>
                                            <th>
                                                Doanh thu
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataStatisticalPackagePost && dataStatisticalPackagePost.length > 0 &&
                                            dataStatisticalPackagePost.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1 + numberPage * PAGINATION.pagerow}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.isHot == 0 ? "Loại bình thường" : "Loại nổi bật"}</td>
                                                        <td>{item.count}</td>
                                                        <td style={{ textAlign: 'right' }}>{item.total} USD</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                        {
                                            dataStatisticalPackagePost && dataStatisticalPackagePost.length == 0 && (
                                                <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom:'15px' }}>

                                                    Không có dữ liệu để hiển thị!

                                                </div>
                                            )
                                        }
                            </div>
                        </div>
                        {
                        dataStatisticalPackagePost && dataStatisticalPackagePost.length > 0 &&
                        <div class='mr-4' style={{display:'flex', justifyContent:'end'}}>Tổng doanh thu: {dataSum} USD</div>
                        }
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
                            onPageChange={(number) => handleChangePage(number,'packagePost')}
                        />
                    </div>

                </div>
                <div className="col-12 grid-margin">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Bảng thống kê doanh thu các gói mua lượt xem ứng viên</h4>
                            <button  style={{float:'right'}} onClick={() => handleOnClickExport('packageCv')} >Xuất excel <i class="fa-solid fa-file-excel"></i></button>
                            <RangePicker onChange={(values)=>onDatePicker(values,'packageCv')}
                                format={'DD/MM/YYYY'}
                            ></RangePicker>


                            <div className="table-responsive pt-2">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>
                                                STT
                                            </th>
                                            <th>
                                                Tên gói
                                            </th>
                                            <th>
                                                Mã gói
                                            </th>
                                            <th>
                                                Số lượng đã bán
                                            </th>
                                            <th>
                                                Doanh thu
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dataStatisticalPackageCv && dataStatisticalPackageCv.length > 0 &&
                                            dataStatisticalPackageCv.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1 + numberPageCv * PAGINATION.pagerow}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.count}</td>
                                                        <td style={{ textAlign: 'right' }}>{item.total} USD</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                                        {
                                            dataStatisticalPackageCv && dataStatisticalPackageCv.length == 0 && (
                                                <div style={{ textAlign: 'center', paddingTop: '15px', paddingBottom:'15px' }}>

                                                    Không có dữ liệu để hiển thị!

                                                </div>
                                            )
                                        }
                            </div>
                        </div>
                        {
                        dataStatisticalPackageCv && dataStatisticalPackageCv.length > 0 &&
                        <div class='mr-4' style={{display:'flex', justifyContent:'end'}}>Tổng doanh thu: {dataSumCv} USD</div>
                        }
                        <ReactPaginate
                            previousLabel={'Quay lại'}
                            nextLabel={'Tiếp'}
                            breakLabel={'...'}
                            pageCount={countCv}
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
                            onPageChange={(number)=>handleChangePage(number,'packageCv')}
                        />
                    </div>

                </div>
                </>

            }
            <Chatbot />
        </>
    )
}

export default Home
