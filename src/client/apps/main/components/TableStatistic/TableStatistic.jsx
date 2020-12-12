import * as React from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import { MDBDataTable } from 'mdbreact';


const TableStatistic = ({rows}) => {
    const data = {
        columns: [
            {
                label: 'Attempt ID',
                field: 'attemptId',
            },
            {
                label: 'User',
                field: 'login',
            },
            {
                label: 'Result',
                field: 'result',
            },
            {
                label: 'Date',
                field: 'date',
            }
        ],
        rows: rows
    };

    return (
        <Container className="p-3">
            <MDBDataTable
                striped
                bordered
                small
                sortable
                searching={false}
                paging={false}
                data={data}
            />
        </Container>
    );
};

TableStatistic.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.exact({
            attemptId: PropTypes.number,
            login: PropTypes.string,
            result: PropTypes.number,
            date: PropTypes.string
        })
    ).isRequired
};

export default TableStatistic;