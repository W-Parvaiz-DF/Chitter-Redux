import { cleanup, findByText, render, screen, waitFor } from '@testing-library/react'
import Home from '../components/Home'
import axios from 'axios';

jest.mock('../components/Peeps.jsx', () => () => <p>Peep Mock</p>);
jest.mock('../components/PeepsNotFound.jsx', () => () => <p>PeepsNotFound Mock</p>)

jest.mock('axios');


//Will need to edit this test when the login is completed as the Home Component will require a prop

const res = {

    data: [{

        username: "Tester1",
        date: new Date(Date.now()),
        text: "Test peep text"
    },
    {

        username: "Tester2",
        date: new Date(Date.now()),
        text: "Test peep text2"

    }

    ]
}

describe('tests for the Home component', () => {

    afterEach(cleanup)


    it('should generate the correct amount of Peeps components', async () => {

        axios.get.mockImplementation(() => Promise.resolve(res));

        render(<Home />)


        //const result = await waitFor(() => screen.getAllByText(`Peep Mock`));
        const result = await screen.findAllByText(`Peep Mock`) //this is the shorthand way to the above and the preferred method

        expect(result.length).toBe(res.data.length);
        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:4000`);


    })


    it('should display an error component if the API call fails', async () => {

        const error = {
            response: {
                status: 0,
                statusText: ''
            },
            message: "Network Error"

        };

        axios.get.mockImplementation(() => Promise.reject(error));

        render(<Home />)

        const result = await screen.findAllByText(`PeepsNotFound Mock`);

        expect(result.length).toBe(1);



    })


    it('should display a 404 message when promise reject with not found', async () => {
        const error = {
            response: {
                status: 404,
                statusText: `Not Found`
            }
        };

        axios.get.mockImplementationOnce(() => Promise.reject(error));

        render(<Home />);


        const rejectedError = await screen.findByText(`There was a ${error.response.status} error: ${error.response.statusText}`); //this is because this is a heading and I havent made a component for this scenario

        expect(rejectedError).toHaveTextContent(error.response.statusText);

    })

})