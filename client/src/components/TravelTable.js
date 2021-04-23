import React from 'react'
import styled from 'styled-components'
import { colorPalette } from '../colorPalette'

const Wrapper = styled.div`
    min-width: 50%;
    overflow-x: scroll;
    text-align: center;
`;
const Table = styled.table`
    width: 100%;
    >tr:nth-of-type(2n) {
        background: ${colorPalette.primaryLighter};
    }
    >tr:nth-of-type(2n+3) {
        background: ${colorPalette.backgroundDark};
    }
    >tr td,th {
            padding: 0.25em 1em;
            border-collapse: collapse;
    }
    //table-layout: fixed;

    
`;

const TableRow = styled.tr`
    //overflow-x: scroll;
`;

const TableHead = styled.th`
    //overflow-x: scroll;
    text-transform: uppercase;
`;

const TableData = styled.td`
//overflow-x: scroll;
`;

const TravelTable = ( { columns, data } ) => {

    const camelize = (head) => {
        head = head.replaceAll('_', ' ')

        return head;
    }

    return (

        <Wrapper>
        <Table>
            <TableRow>
                {
                    columns.map((head) => {
                        return <TableHead key={head}>{camelize(head)}</TableHead>
                    })
                }
            </TableRow>
                {
                    data.map((data) => {
                        return ( 
                        <TableRow>
                            {
                                columns.map((head) => {
                                    console.log(`data[head]`, data[head])

                                    if (head === 'departure' || head === 'arrival' || head === 'pay_by_date' ) {
                                        return <TableData key={head}>
                                                <dt>{data[head].split("T")[0]}</dt>
                                                <dt>{data[head].split("T")[1].split(".")[0]}</dt>
                                               </TableData>

                                    } else if (head === 'paid') {
                                        return <TableData key={head}>
                                                {data[head] ? 'Yes' : 'No'}
                                               </TableData>
                                    } else {
                                        return <TableData key={head}>{data[head]}</TableData>
                                    }
                                })
                            }
                        </TableRow>
                        )
                    })
                }
        </Table>
        </Wrapper>
    )
}

export default TravelTable
