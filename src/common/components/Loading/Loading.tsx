import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Text = styled.p`
    font-size: 24px;
    font-weight: bolder;
    margin-bottom: 16px;
    text-align: center;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const CustomSpin = styled(Spin)`
    display: block !important;
`

const LoadingState = () => {
    return (
        <Container>
            <Text>
                Loading
            </Text>
            <CustomSpin size="large" />
        </Container>
    )
}

export default LoadingState
