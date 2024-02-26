import React, {useContext, useEffect, useState} from 'react';
import QuestionAreaIndividual from './QuestionAreaIndividual';
import Editor from './Editor';
import TopNavBar from './TopNavBar';
import {getQuestions} from "../api/QuestionApi";

function QuestionRowIndividual() {
    const storedUser = JSON.parse(localStorage.getItem('loginUser'));
    const loginUser = storedUser || null;
    const [questionList, setQuestionList] = useState([]);

    const getQuestionList = async () => {
        try {
            const response = await getQuestions(loginUser.accessToken);
            // Assuming the data is an array inside the response
            setQuestionList(response.data);
        } catch (error) {
            console.error('Failed to get questions:', error);
        }
    };

    useEffect(() => {
        if (loginUser) {
            getQuestionList();
        }
    }, [loginUser]);

    return (
        <>
            <TopNavBar/>
            {Array.isArray(questionList) && questionList.map((question, index) => (
                <div
                    key={question.id}
                    style={{
                        display: 'flex',
                        marginBottom: '100px',
                        marginLeft: '20px'
                    }}
                >
                    <div
                        style={{
                            marginLeft: '20px'
                        }}
                    >
                        <QuestionAreaIndividual question={question}/>
                    </div>
                    <Editor/>
                </div>
            ))}
        </>
    );
}

export default QuestionRowIndividual;