import React, { useState } from 'react';
import './ChatHomePage.css';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    
    const predefinedQA = [
        {
            question: "Job Finder là gì?",
            answer: "Job Finder là một trang web tìm kiếm việc làm và tuyển dụng ngành kỹ thuật, giúp người tìm việc và nhà tuyển dụng tìm kiếm và tuyển dụng nhau một cách dễ dàng và hiệu quả."
        },
        {
            question: "Làm thế nào để ứng tuyển công việc?",
            answer: "Để ứng tuyển công việc, bạn vui lòng đăng nhập nếu bạn đã có tài khoản hoặc đăng ký tài khoản mới với vai trò ứng viên. Sau đó và điền đầy đủ thông tin cá nhân và vào phần 'Việc làm' để tìm kiếm công việc phù hợp."
        },
        {
            question: "Làm sao tạo bài đăng việc làm?",
            answer: "Bạn vui lòng đăng nhập nếu bạn đã có tài khoản hoặc đăng ký tài khoản mới với vai trò nhà tuyển dụng. Sau đó và điền đầy đủ thông tin về công ty của bạn và bài đăng tuyển dụng vào phần 'Quản lý bài đăng' để tạo bài đăng việc làm."
        },
        {
            question: "Bạn có câu hỏi khác?",
            answer: "Bạn vui lòng liên hệ với chúng tôi qua email: jobfindersystems@gmail.com."
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
