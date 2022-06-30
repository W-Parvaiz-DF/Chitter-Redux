import { render, screen } from '@testing-library/react'
import Home from '../components/Home'

jest.mock('../components/Peeps.jsx', () => () => <p>Peep Mock</p>)

describe('tests for the Home component', () => {


    xit('should generate the correct amount of Peeps components', () => {

        //involves axios testing which im not too sure how to do yet will return to this later

    })






})