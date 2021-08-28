import rewire from "rewire"
const index = rewire("./index")
const setupCurrentInput = index.__get__("setupCurrentInput")
// @ponicode
describe("setupCurrentInput", () => {
    test("0", () => {
        let callFunction: any = () => {
            setupCurrentInput()
        }
    
        expect(callFunction).not.toThrow()
    })
})
