import {render,screen} from '@testing-library/react'
import {test,expect} from 'vitest'
import Register from "../pages/Register"

test("renders register button",()=>{
    render(<Register/>)
    expect(screen.getByRole("button",{
        name:/Register/i
    })).toBeInTheDocument()
})