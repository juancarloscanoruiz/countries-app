import { Component } from 'react';
import { ErrorBoundaryState } from './interface/error-boundary-state.interface';
import { ErrorBoundaryProps } from './interface/error-boundary.interface';
import { Result } from 'antd';
import styled from 'styled-components';

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {

    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = {
            throwsError: false,
            renderError: null
        }
    }

    static getDerivedStateFromError() {
        return {
            throwsError: true
        }
    }

    render() {
        if (this.state.throwsError) {
            if (this.props.renderError) {
                return this.props.renderError;
            } else {
                return (
                    <FlexContainer>
                        <Result
                            status="500"
                            title="500"
                            subTitle="Sorry, something went wrong."
                        />
                    </FlexContainer>
                )
            }
        }

        return this.props.children
    }
}
