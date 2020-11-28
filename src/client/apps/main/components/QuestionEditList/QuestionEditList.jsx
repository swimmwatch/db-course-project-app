import * as React from "react";
import {ANSWER_TYPE} from "../../../../../models/Test/config";
import PropTypes from "prop-types";

import QuestionEditItem from "../QuestionEditItem";

class QuestionEditList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            questions,
            deleteQuestion,
            updateQuestionTitle,
            changeQuestionType,
            appendAnswer
        } = this.props;

        return (
            <>
                {
                    questions.map((question, i) => {
                        const {
                            typeAnswer,
                            answers,
                            title
                        } = question;

                        return (
                            <QuestionEditItem name={i}
                                              key={i}
                                              typeAnswer={typeAnswer}
                                              answers={answers}
                                              title={title}
                                              onDelete={() => deleteQuestion(i)}
                                              onUpdateTitle={titleVal => updateQuestionTitle(i, titleVal)}
                                              onChangeAnswerType={typeAnswer => changeQuestionType(i, typeAnswer)}
                                              onAnswerListUpdate={id => appendAnswer(id)} />
                        );
                    })
                }
            </>
        );
    }
}

QuestionEditList.propTypes = {
    questions: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string,
            typeAnswer: PropTypes.oneOf([ ANSWER_TYPE.ONE, ANSWER_TYPE.MULTIPLE ]),
            answers: PropTypes.arrayOf(
                PropTypes.exact({
                    content: PropTypes.string,
                    isRight: PropTypes.bool
                })
            )
        }).isRequired
    ),
    deleteQuestion: PropTypes.func,
    updateQuestionTitle: PropTypes.func,
    changeQuestionType: PropTypes.func,
    appendAnswer: PropTypes.func
};

export default QuestionEditList;