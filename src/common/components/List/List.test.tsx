import { render } from "@testing-library/react"
import { Country } from "../../interfaces/country.interface";
import ListComponent from './ListComponent';
import { Card } from "antd";
describe('List Component Test', () => {
    test('renders a list of items', () => {
        const fakeData: Country[] = [
            { 
                name: 'A', 
                capital: 'A', 
                code: 'A', 
                continent: { name: 'Oceania' }, 
                currency: 'A', 
                languages: [{ name: 'Español' }] 
            },
            {
                name: 'B', 
                capital: 'B', 
                code: 'B', 
                continent: { name: 'Oceania' }, 
                currency: 'B', 
                languages: [{ name: 'Español' }] 
            }
        ]
    
    const RenderedComponent = () => (
        <ListComponent 
            data={fakeData}
            renderItem={(country: Country) => (
                <Card key={country.code}>Name: {country.name}</Card>
            )}
        />
    )
    
        const { getAllByText } = render(<RenderedComponent />)
        const elements = getAllByText('name', { exact: false });
        expect(elements).toHaveLength(2)
    });

    test('renders a text when the data is empty', () => {
        const RenderedComponent = () => (
            <ListComponent
                data={[]}
                renderItem={(country: Country) => (
                    <Card>Name: {country.name}</Card>
                )}
                renderEmpty={<p>No hay datos</p>}
            />
        )

        const { getByText } = render(<RenderedComponent />)
        const element = getByText('No hay datos', { exact: true })
        expect(element).toBeInTheDocument()
    })

})