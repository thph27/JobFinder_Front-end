import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { getListJobTypeAndCountPost } from '../../service/userService'
import Category from './Category'

const Categories = () => {
    const [allCategory, setAllCategory] = useState([])
    
    useEffect(() => {
        const loadCategories = async () => {
            let res = await getListJobTypeAndCountPost({
                limit: 8,
                offset: 0
            })
            if (res.errCode === 0)  
                setAllCategory(res.data)
            else
                toast.error(res.message)
        }
        loadCategories()
    }, [])

    return (
        <div className="category-slider" style={{
            position: 'relative',
            padding: '30px 0'
        }}>
            <div className="row flex-nowrap" style={{
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                margin: '0 -15px'
            }}>
                {allCategory.map((data, index) => (
                    <Category data={data} key={index} />
                ))}
            </div>
            
            {/* Nút điều hướng */}
            <button 
                className="nav-btn prev" 
                onClick={() => {
                    const slider = document.querySelector('.row.flex-nowrap')
                    slider.scrollLeft -= 400
                }}
                style={{
                    position: 'absolute',
                    left: '-25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '1px solid #e8eef3',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    zIndex: 2,
                    fontSize: '20px'
                }}
            >
                ←
            </button>
            
            <button 
                className="nav-btn next"
                onClick={() => {
                    const slider = document.querySelector('.row.flex-nowrap')
                    slider.scrollLeft += 400
                }}
                style={{
                    position: 'absolute',
                    right: '-25px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    border: '1px solid #e8eef3',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                    cursor: 'pointer',
                    zIndex: 2,
                    fontSize: '20px'
                }}
            >
                →
            </button>
        </div>
    )
}

export default Categories
