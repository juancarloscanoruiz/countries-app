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
import { HomeFilters, HomeViewProps } from './home.interface';
import getHomeModule from './redux-saga';

const CustomCard = styled(Card)`
    width: 100%;
    margin-bottom: 16px;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 768px) {
        flex-direction: column-reverse;
        align-items: baseline;
        margin-bottom: 24px;
    }
`
const TextCard = styled.p`
    font-weight: normal;
`;

const CustomInput = styled(Input)`
    max-width: 300px;
`;

const SelectContainer = styled.div`
    width: 100%;
    max-width: 150px;
    &:last-of-type {
        margin-left: 16px;
        margin-bottom: 24px;
    }
    @media (max-width: 768px) {
        margin-bottom: 16px;
        &:last-of-type {
            margin-bottom: 0px;
            margin-left: 0;
        }
    }
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

const FiltersSelectContainer = styled.div`
    display: flex;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;


const HomeView: React.FC<HomeViewProps> = (props) => {
    const { countriesRequest: getCountriesRequest, countries, continents, continentsRequest: getContinentsRequest } = props;
    const { isLoading: isLoadingCountries, data: dataCountries, error: errorCountries } = countries;
    const { isLoading: isLoadingContinents, data: dataContinents, error: errorContinents } = continents;
    const [filterCountries, setFilterCountries] = useState<Country[]>([]);
    const [searchFiled, setSearchField] = useState<string>('');
    const [currencies, setCurrencies] = useState<string[]>([]);
    const [filters, setFilters] = useState<HomeFilters>({
        continentCode: '',
        currency: '',
    })
    

    useEffect(() => {
        getCountriesRequest(filters)
        getContinentsRequest()
    }, [])

    useEffect(() => {
        if (!isLoadingCountries) {
            setFilterCountries(dataCountries);
            if (dataCountries.length > 0) {
                const countriesCurrencies = dataCountries.map((country: Country) => country.currency)
                let currencyCatalog: string[] = [];
                countriesCurrencies.forEach((currency: string) => {
                    if (currency) {
                        const currencyArray = currency.split(',');
                        currencyArray.forEach((item: string) => currencyCatalog.push(item))
                    }
                })
                const currencySet = new Set(currencyCatalog);
                const currenciesCatalog = Array.from(currencySet);
                setCurrencies(currenciesCatalog)

            }
        }
    }, [dataCountries, isLoadingCountries])


    const filteredCountries = filterCountries
        .filter((country: Country) => country.name.toLowerCase().includes(searchFiled.toLowerCase()))

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const countryName = e.target.value;
        setSearchField(countryName);
    }

    const handleFilterContinent = (value: string) => {
        const newFilters: HomeFilters = {
            ...filters,
            continentCode: value,
        }
        setFilters(newFilters)
        getCountriesRequest(newFilters);
    }

    const handleFilterCurrency = (value: string) => {
        const newFilters: HomeFilters = {
            ...filters,
            currency: value,
        }
        setFilters(newFilters)
        getCountriesRequest(newFilters);
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
                    <SearchContainer>
                        <CustomInput disabled={isLoadingCountries} onChange={handleChange} placeholder="Search a country" />
                        <FiltersContainer>
                            <FilterText>Filters</FilterText>
                            <FiltersSelectContainer>
                                <SelectContainer>
                                    <Select style={{width: '150px', maxWidth: '150px'}} disabled={isLoadingContinents} onChange={handleFilterContinent} loading={isLoadingContinents} placeholder="Select a continent">
                                        {
                                            dataContinents.map((continent: Continent) => <Option key={continent.code} value={continent.code}>{continent.name}</Option>)
                                        }
                                    </Select>
                                </SelectContainer>
                                <SelectContainer>
                                    <Select style={{width: '150px'}} showSearch disabled={isLoadingCountries} onChange={handleFilterCurrency} loading={isLoadingContinents} placeholder="Select a currency">
                                        {
                                            currencies.map((currency: string) => <Option key={currency} value={currency}>{currency}</Option>)
                                        }
                                    </Select>
                                </SelectContainer>
                            </FiltersSelectContainer>

                        </FiltersContainer>
                    </SearchContainer>
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
                                    <Col xs={24} md={8} key={country.code}>
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
