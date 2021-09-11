import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DynamicModuleLoader } from 'redux-dynamic-modules-react';
import { Card, Row, Col, Input, Empty, Select, Result } from 'antd';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Country } from '../../common/interfaces/country.interface';
import { List } from '../../common/components/List';
import { Loading } from '../../common/components/Loading';
import { Continent } from '../../common/interfaces/continent.interface';
import { countriesRequest } from '../../RootModule/actions/countries';
import { continentsRequest } from './redux-saga/actions';
import getRootModule from '../../RootModule';
import { HomeViewProps } from './home.interface';
import getHomeModule from './redux-saga';

const CustomCard = styled(Card)`
    width: 100%;
    margin-bottom: 16px;
`;

const FlexContiainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const TextCard = styled.p`
    font-weight: normal;
`;

const CustomInput = styled(Input)`
    max-width: 300px;
`;

const FiltersContainer = styled.div`
    margin: 16px 0px;
`;

const FilterText = styled.p`
    margin-bottom: 8px;
`;

const EmtpyContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 16px 0;
    width: 100%;
`;

const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;


const HomeView: React.FC<HomeViewProps> = (props) => {
    const { countriesRequest: getCountriesRequest, countries, continents, continentsRequest: getContinentsRequest } = props;
    const { isLoading: isLoadingCountries, data: dataCountries, error: errorCountries } = countries;
    const { isLoading: isLoadingContinents, data: dataContinents, error: errorContinents } = continents;

    useEffect(() => {
        getCountriesRequest()
        getContinentsRequest()
    }, [])

    useEffect(() => {
        if (!isLoadingCountries) {
            setFilterCountries(dataCountries);
        }
    }, [dataCountries, isLoadingCountries])

    const [filterCountries, setFilterCountries] = useState<Country[]>([]);
    const [searchFiled, setSearchField] = useState<string>('');
    const [continentFilter, setContinentFilter] = useState<string>('');


    useEffect(() => {
        getCountriesRequest(continentFilter)
    }, [continentFilter])


    const filteredCountries = filterCountries
        .filter((country: Country) => country.name.toLowerCase().includes(searchFiled.toLowerCase()))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const countryName = e.target.value;
        setSearchField(countryName);
    }

    const handleFilterContinent = (value: string) => {
        setContinentFilter(value);
    }

    const { Option } = Select;

    if (errorContinents || errorCountries) {
        <FlexContainer>
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong."
            />
        </FlexContainer>
    }

    return (
            <Row justify="center">
                <Col span={20}>
                    <FlexContiainer>
                        <CustomInput disabled={isLoadingCountries} onChange={handleChange} placeholder="Search a country" />
                        <FiltersContainer>
                            <FilterText>Filters</FilterText>
                            <Select disabled={isLoadingContinents} onChange={handleFilterContinent} loading={isLoadingContinents} placeholder="Select a continent">
                                {
                                    dataContinents.map((continent: Continent) => <Option value={continent.code}>{continent.name}</Option>)
                                }
                            </Select>
                        </FiltersContainer>
                    </FlexContiainer>
                    {
                        isLoadingCountries ? 
                        <Row justify="center">
                            <Col span={20}>
                                <Loading />
                            </Col>
                        </Row> 
                        :
                        <Row gutter={16}>
                            <List 
                                data={filteredCountries} 
                                renderEmpty={
                                    <EmtpyContainer>
                                        <Empty />
                                    </EmtpyContainer>
                                } 
                                renderItem={(country: Country) => 
                                    <Col key={country.code} span={8}>
                                        <Link to={`/country/${country.code}`}>
                                            <CustomCard title={country.name}>
                                                <TextCard>
                                                    Capital: {country.capital}
                                                </TextCard>
                                                <TextCard>
                                                    Code: {country.code}
                                                </TextCard>
                                                <TextCard>
                                                    Continent: {country.continent.name}
                                                </TextCard>
                                            </CustomCard>  
                                        </Link>       
                                    </Col>
                                } 
                            />
                        </Row>
                    }
                </Col>
            </Row>

    )
}

function mapStateToProps(state: any) {
    return { 
        countries: state?.APP?.countries,
        continents: state?.HOME?.continents,
    };
}

const ConnectedHomeView = connect(mapStateToProps, {
    countriesRequest,
    continentsRequest,
})(HomeView);

const Home = () => (
    <DynamicModuleLoader modules={[getRootModule(), getHomeModule()]}>
        <ConnectedHomeView />
    </DynamicModuleLoader>
)

export default Home
