import React from 'react'
import { useEffect, useState } from 'react';
import { createSkilleService, getDetailSkillById, UpdateSkillService } from '../../../service/userService';
import { useFetchAllcode } from '../../../util/fetch';
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CommonUtils from '../../../util/CommonUtils';
import { Spinner, Modal } from 'reactstrap'
import '../../../components/modal/modal.css'
import './AddJobSkill.scss';
import { Col, Row, Select } from 'antd';
const AddJobSkill = () => {
    const [isActionADD, setisActionADD] = useState(true)

    const [isLoading, setIsLoading] = useState(false)

    const { code } = useParams();

    const [inputValues, setInputValues] = useState({
        name: '', categoryJobCode: '', id: ''
    });

    let fetchDetailJobType = async (code) => {
        setisActionADD(false)
        let skill = await getDetailSkillById(code)
        if (skill && skill.errCode === 0) {
            setInputValues({ ...inputValues, ["name"]: skill.data.name, ["id"]: skill.data.id, ["categoryJobCode"]: skill.data.categoryJobCode  })
        }
    }

    let { data: listCategoryJobCode } = useFetchAllcode('JOBTYPE');
    listCategoryJobCode = listCategoryJobCode.map(item=> ({
        value: item.code,
        label: item.value
    }))

    useEffect(() => {

        if (code) {
            fetchDetailJobType(code)
        }
    }, [])

    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });
    };

    let handleOnChangeCategoryJobCode = async(value) => {
        setInputValues({
            ...inputValues,
            categoryJobCode: value
        })
    }

    let handleSaveJobSkill = async () => {
        setIsLoading(true)
        if (isActionADD === true) {
            let res = await createSkilleService({
                name: inputValues.name,
                categoryJobCode: inputValues.categoryJobCode
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Thêm chuyên môn thành công")
                    setInputValues({
                        ...inputValues,
                        ["name"]: '',
                        ["categoryJobCode"]: '',
                    })
                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Thêm chuyên môn thất bại")
            }, 50);
        } else {
            let res = await UpdateSkillService({
                name: inputValues.name,
                id: code,
                categoryJobCode: inputValues.categoryJobCode
            })
            setTimeout(() => {
                setIsLoading(false)
                if (res && res.errCode === 0) {
                    toast.success("Cập nhật chuyên môn thành công")

                }
                else if (res && res.errCode === 2) {
                    toast.error(res.errMessage)
                }
                else toast.error("Cập nhật chuyên môn thất bại")
            }, 50);
        }
    }
    const history = useHistory()
    return (
        <div className=''>
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <div className="btn1 btn1-primary1 btn1-icon-text" style={{marginBottom:'30px'}} onClick={() => history.goBack()}>
                            <i className="fa-solid fa-arrow-left" style={{marginRight:'10px'}}></i>
                            Quay lại
                        </div>

                        <h4 className="card-title" style={{textTransform:'uppercase'}}>{isActionADD === true ? 'Thêm mới chuyên môn' : 'Cập nhật chuyên môn'}</h4>
                        <br></br>
                        <form className="form-sample">
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Tên chuyên môn</label>
                                        <div className="col-sm-8">
                                            <input type="text" value={inputValues.name} name="name" onChange={(event) => handleOnChange(event)} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Row>
                            <Col xs={4} xxl={4}>
                                <label className='mr-2'>Ngành nghề</label>
                            </Col>
                            <Col xs={12} xxl={12}>
                                <Select style={{width:'86%'}} onChange={(value)=> handleOnChangeCategoryJobCode(value)} value={inputValues.categoryJobCode}  size='default' options={listCategoryJobCode ? listCategoryJobCode : []}>
                                </Select>
                            </Col>
                            </Row>


                            <button style={{marginTop:'40px'}} type="button" className="btn1 btn1-primary1 btn1-icon-text" onClick={() => handleSaveJobSkill()}>
                                <i class="ti-file btn1-icon-prepend"></i>
                                Lưu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {isLoading &&
                <Modal isOpen='true' centered contentClassName='closeBorder' >

                    <div style={{
                        position: 'absolute', right: '50%',
                        justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Spinner animation="border"  ></Spinner>
                    </div>

                </Modal>
            }
        </div>
    )
}

export default AddJobSkill
