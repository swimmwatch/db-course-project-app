import * as React from "react";
import { connect } from "react-redux";
import {ANSWER_TYPE} from "../AnswerEditList/config";
import PropTypes from "prop-types";

import QuestionEditItem from "../QuestionEditItem";

class QuestionEditList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { questions } = this.props;

        return (
            <>
                {
                    questions.map((el, i) => {
                        return (
                            <QuestionEditItem name={i} key={i} />
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
        })
    )
};

function mapStateToProps(state) {
    const { questions } = state.testEditor;

    return { questions };
}

const connectedQuestionEditList = connect(mapStateToProps)(QuestionEditList);

export { connectedQuestionEditList as QuestionEditList };