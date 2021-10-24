import React from 'react';
import styled from 'styled-components';
import { IconContext } from "react-icons";
import { IoMdTrain } from 'react-icons/io';

const StyledTrain = styled.div`
    position: absolute;
    left: -20px;
    top: -20px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${ props => props.color ? props.color : '#cccccc'};
`;

const Train = (props) => {
    const { color } = props;
    return(
        <IconContext.Provider value={{ color: color ? color : '#cccccc', size: '15px' }}>
            <StyledTrain color={color}>
                <IoMdTrain />
            </StyledTrain>
        </IconContext.Provider>
    );
}

export default Train;