import React from 'react'
import { Link } from 'react-router-dom'

const Category = (props) => {
    return (
        <div className="col" style={{ minWidth: '300px', padding: '15px' }}>
            <div className="category-card text-center" style={{
                backgroundColor: '#f8f9fa',
                borderRadius: '20px',
                padding: '35px 25px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                height: '100%'
            }}>
                <div className="category-icon" style={{
                    width: '120px',
                    height: '120px',
                    margin: '0 auto 25px',
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #e8eef3'
                }}>
                    <img 
                        src={props.data.postDetailData.jobTypePostData.image}
                        alt={props.data.postDetailData.jobTypePostData.value}
                        style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'contain'
                        }}
                    />
                </div>
                <h5 style={{
                    fontSize: '22px',
                    marginBottom: '15px',
                    color: '#28395a',
                    fontWeight: '600'
                }}>
                    <Link to="/job" style={{textDecoration: 'none', color: 'inherit'}}>
                        {props.data.postDetailData.jobTypePostData.value}
                    </Link>
                </h5>
                <span style={{
                    color: '#707b8e',
                    fontSize: '16px'
                }}>
                    ({props.data.amount} việc làm)
                </span>
            </div>
        </div>
    )
}

export default Category
