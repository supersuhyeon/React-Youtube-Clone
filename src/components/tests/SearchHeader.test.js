import { Route } from 'react-router-dom'
import renderer from 'react-test-renderer'
import SearchHeader from '../SearchHeader'
import { withRouter } from "../../tests/utils"
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Search Header', ()=>{
    it('renders correctly', ()=>{
        //컴포넌트가 잘 동작하는지 정적으로 확인하는법
        const component = renderer.create(
            withRouter(<Route path='/' element={<SearchHeader></SearchHeader>}></Route>)
        )
        expect(component.toJSON()).toMatchSnapshot();
    })

    it('renders with keyword correctly ', async () => {
        //검색버튼을 누르면 경로로 이동하는지
        render(
          withRouter(<Route path='/:keyword' element={<SearchHeader />} />, '/bts')
        );
        expect(screen.getByDisplayValue('bts')).toBeInTheDocument();
      });
    
      it('navigates to results page on search button click', async()=>{
        const searchKeyword = 'fake-keyword'

        render(
            withRouter(
                <>
                <Route path='/home' element={<SearchHeader></SearchHeader>}></Route>
                <Route path={`/videos/${searchKeyword}`} element={<p>{searchKeyword}</p>}></Route>
                </>,'/home'
            )
        )
        const searchInput = screen.getByRole('textbox')
        const searchButton = screen.getByLabelText('searchbtn')

          await waitFor(()=>{
            userEvent.type(searchInput, searchKeyword)
            userEvent.click(searchButton) 
            expect(screen.getByText(searchKeyword)).toBeInTheDocument()
          })
      })
})