import * as React from "react";
import QuestionEditItem from "../QuestionEditItem";

class QuestionEditList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <QuestionEditItem name={1} />
                <QuestionEditItem name={2} />
                <QuestionEditItem name={3} />
            </>
        );
    }
}

export default QuestionEditList;