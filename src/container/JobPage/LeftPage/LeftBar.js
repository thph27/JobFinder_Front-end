import React, { useState } from 'react'
import { useFetchAllcode } from '../../../util/fetch'

const selectStyle = {
    width: '100%',
    padding: '8px',
    border: '1px solid #e8e8e8',
    borderRadius: '4px',
    marginBottom: '10px',
    height: '45px'
}

const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#fb246a',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
}

const LeftBar = (props) => {
    const { data: dataJobType } = useFetchAllcode('JOBTYPE')
    const { data: dataJobLevel } = useFetchAllcode('JOBLEVEL')
    const { data: dataSalaryType } = useFetchAllcode('SALARYTYPE')
    const { data: dataExpType } = useFetchAllcode('EXPTYPE')
    const { data: dataWorkType } = useFetchAllcode('WORKTYPE')
    const { data: dataJobLocation } = useFetchAllcode('PROVINCE')

    const [check, setCheck] = useState()

    const handleClearFilters = () => {
        // Reset UI elements
        const selects = document.querySelectorAll('select');
        selects.forEach(select => select.value = "");
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);

        // Gọi hàm clear filter từ component cha
        props.handleClearFilter();
    }

    return (
        <>
            <div className="job-category-listing mb-50" style={{padding: '30px 30px 30px 30px'}}>
                {/* <!-- single one --> */}
                <div className="single-listing">
                    <div className="small-section-tittle2">
                        <h4>Lĩnh vực</h4>
                    </div>
                    {/* <!-- Select job items start --> */}
                    <div className="select-job-items2">
                        <select name="select" style={selectStyle} onChange={(e) => {
                            props.recieveJobType(e.target.value)
                        }}>
                            <option value="">Tất cả</option>
                            {dataJobType.map((data, index) => {
                                return (
                                    <option value={data.code} key={index}>{data.value}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* <!--  Select job items End--> */}
                    {/* <!-- select-Categories start --> */}
                    <div className="select-Categories pt-30 pb-30">
                        <div className="small-section-tittle2">
                            <h4>Hình thức làm việc</h4>
                        </div>
                        {dataWorkType.map((data, index) => {
                            return (
                                <label className="container" key={index}>{data.value}
                                    <input type="checkbox" value={data.code} onChange={(e) => {

                                        props.worktype(e.target.value)
                                    }} required />
                                    <span className="checkmark"></span>
                                </label>
                            )
                        })}
                    </div>
                    {/* <!-- select-Categories End --> */}
                </div>
                {/* <!-- single two --> */}
                <div className="single-listing">
                    <div className="small-section-tittle2">
                        <h4>Nơi làm việc</h4>
                    </div>
                    {/* <!-- Select job items start --> */}
                    <div className="select-job-items2">
                        <select name="select" style={selectStyle} onChange={(e) => {
                            props.recieveLocation(e.target.value);
                        }}>
                            <option value="">Tất cả</option>
                            {dataJobLocation.map((data, index) => {
                                return (
                                    <option value={data.code} key={index}>{data.value}</option>
                                )
                            })}
                        </select>
                    </div>
                    {/* <!--  Select job items End--> */}
                    {/* <!-- select-Categories start --> */}
                    <div className="select-Categories pt-30 pb-30">
                        <div className="small-section-tittle2">
                            <h4>Kinh nghiệm làm việc</h4>
                        </div>
                        <div className="select-job-items2">
                            <select name="select" style={selectStyle} onChange={(e) => {
                                props.recieveExp(e.target.value)
                            }}>
                                <option value="">Tất cả</option>
                                {dataExpType.map((data, index) => {
                                    return (
                                        <option value={data.code} key={index}>{data.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    {/* <!-- select-Categories End --> */}
                </div>
                {/* <!-- single three --> */}
                <div className="single-listing">
                    {/* <!-- select-Categories start --> */}
                    <div className="select-Categories pb-30">
                        <div className="small-section-tittle2">
                            <h4>Vị trí</h4>
                        </div>
                        <div className="select-job-items2">
                            <select name="select" style={selectStyle} onChange={(e) => props.recieveJobLevel(e.target.value)}>
                                <option value="">Tất cả</option>
                                {dataJobLevel.map((data, index) => {
                                    return (
                                        <option value={data.code} key={index}>{data.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    {/* <!-- select-Categories End --> */}
                    <div className="select-Categories pb-30">
                        <div className="small-section-tittle2">
                            <h4>Mức lương</h4>
                        </div>
                        <div className="select-job-items2">
                            <select name="select" style={selectStyle} onChange={(e) => props.recieveSalary(e.target.value)}>
                                <option value="">Tất cả</option>
                                {dataSalaryType.map((data, index) => {
                                    return (
                                        <option value={data.code} key={index}>{data.value}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                    <button 
                        className='btn1 btn1-primary1 btn1-lg'
                        onClick={handleClearFilters}
                        style={{
                            fontSize: '18px',
                            fontWeight: 'semibold'
                        }}
                    >
                        Xóa bộ lọc
                    </button>
                </div>
            </div>
        </>
    )
}

export default LeftBar

