import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    
    const predefinedQA = [
        {
            question: "Làm thế nào để đăng tin tuyển dụng?",
            answer: "Để đăng tin tuyển dụng, bạn vui lòng vào phần 'Quản lý bài đăng' và chọn gói đăng tin phù hợp. Sau đó và điền đầy đủ thông tin về bài đăng."
        },
        {
            question: "Làm sao để xem hồ sơ ứng viên?",
            answer: "Bạn sẽ có 5 lượt xem ứng viên miễn phí. Sau đó cần mua gói xem hồ sơ ứng viên để xem thêm."
        },
        {
            question: "Chi phí đăng bài là bao nhiêu?",
            answer: "Chúng tôi hiện có gói đăng bài bình thường và nổi bật với các mức giá khác nhau, bạn có thể xem chi tiết tại mục 'Tìm kiếm ứng viên'."
        },
        {
            question: "Làm sao để xem hồ sơ ứng viên đã ứng tuyển vào bài đăng của tôi?",
            answer: "Bạn vui lòng vào phần 'Quản lý bài đăng' và chọn bài đăng của bạn. Sau đó bạn có thể xem danh sách ứng viên đã ứng tuyển vào bài đăng của bạn."
        }
    ];

    const handleQuestionClick = (question, answer) => {
        setMessages([...messages, 
            { type: 'question', text: question },
            { type: 'answer', text: answer }
        ]);

    };
    return (
        <div className="chatbot-container">
            <button 
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                <i className="fas fa-comments"></i>
            </button>

            {isOpen && (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <h3 className="text-white">Câu hỏi thường gặp</h3>
                        <button onClick={() => setIsOpen(false)}>×</button>
                    </div>
                    
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} 
                                className={`message ${msg.type}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="chatbot-questions">
                        <h4>Câu hỏi thường gặp:</h4>
                        {predefinedQA.map((qa, index) => (
                            <button 
                                key={index}
                                onClick={() => handleQuestionClick(qa.question, qa.answer)}
                            >
                                {qa.question}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
