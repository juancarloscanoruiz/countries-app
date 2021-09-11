import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col, Card, Result } from 'antd';
import { connect } from 'react-redux';
import { CountryDetailProps, UseParamsCountryDetail } from './interfaces';
import { Loading } from '../../common/components/Loading';
import { List } from '../../common/components/List';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { countryDetailRequest } from './redux-saga/actions';
import getCountryDetailModule from './redux-saga';
import { useEffect } from 'react';
import { Language } from '../../common/interfaces/country.interface';


const CountryDetailTitle = styled.h1`
    font-size: 24px;
`;

const Container = styled.div`
    margin-top: 24px;
`;

const CountryDetailText = styled.p``

const CountryDetailList = styled.ul`
    margin-left: 48px;
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const CountryDetailListItem = styled.li``;

const CountryDetailView: React.FC<CountryDetailProps> = (props: CountryDetailProps) => {

    const { countryDetailRequest, country: countryDetail } = props;

    const { code } = useParams<UseParamsCountryDetail>();
    useEffect(() => {
        countryDetailRequest(code)
    }, [])

    const { data: dataCountry, isLoading: isLoadingCountryDetail, error } = countryDetail;

    if ( error ) {
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

    return (
        <Row justify="center">
            <Col span={20}>
                <Container>
                    {
                        isLoadingCountryDetail ?
                            <Loading />
                        :
                            <Card title={<CountryDetailTitle>{dataCountry?.name}</CountryDetailTitle>}>
                                <CountryDetailText>Currency: {dataCountry?.currency}</CountryDetailText>
                                <CountryDetailText>Code: {dataCountry?.code}</CountryDetailText>
                                <CountryDetailText>Continent: {dataCountry?.continent.name}</CountryDetailText>
                                <CountryDetailText>Capital: {dataCountry?.capital}</CountryDetailText>
                                <CountryDetailText>Languages: </CountryDetailText>
                                <CountryDetailList>
                                    <List 
                                        data={dataCountry?.languages}
                                        renderEmpty={<CountryDetailText>No languages available</CountryDetailText>}
                                        renderItem={(language: Language) => 
                                            <CountryDetailListItem>
                                                {language.name}
                                            </CountryDetailListItem>
                                        }
                                    />
                                </CountryDetailList>
                            </Card>
                    }
                </Container>
            </Col>
        </Row>
    )
}

function mapStateToProps(state: any) {
    return { 
        country: state?.COUNTRY_DETAIL?.country,
    };
}

const ConnectedCountryDetailView= connect(mapStateToProps, {
    countryDetailRequest,
})(CountryDetailView);

const CountryDetail = () => (
    <DynamicModuleLoader modules={[getCountryDetailModule()]}>
        <ConnectedCountryDetailView />
    </DynamicModuleLoader>
)


export default CountryDetail
