export const CountriesQuery = `
    query($filter: CountryFilterInput) {
        countries(filter: $filter) {
            code
            name
            currency
            continent {
                name
            }
            languages {
                name
            }
            capital
        }
    }
`;

export const getCountry = `
    query($code: ID!) {
        country(code: $code) {
            name
            code
            currency
            continent {
                name
            }
            languages {
                name
            }
            capital
        }
    }
`;