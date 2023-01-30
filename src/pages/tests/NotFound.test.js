import { Route } from "react-router-dom"
import { withRouter } from "../../tests/utils"
import NotFound from "../NotFound"
import renderer from 'react-test-renderer'

describe('NotFound', ()=>{
    it('renders correctly', ()=>{
        const component = renderer.create(
            withRouter(
                <Route path="/" element={<NotFound></NotFound>}></Route>)
        )
        expect(component.toJSON()).toMatchSnapshot()
    })
})