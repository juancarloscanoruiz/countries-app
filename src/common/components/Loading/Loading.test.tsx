import { render } from '@testing-library/react';
import Loading from './Loading';
describe('Loading component test', () => {
    test('renders loading component', () => {
        const { getByText } = render(<Loading />)
        const element = getByText('Loading', { exact: true });
        expect(element).toBeInTheDocument();
    })
})