import { Auth } from 'aws-amplify'
import { mutations, actions } from '@/store/auth'

describe('Auth', () => {
  const user = { email: 'user@app.com', password: '123' }
  const state = { isAuthenticated: false, user: null }
  const commit = jest.fn()
  const dispatch = jest.fn()
  const context = { commit, dispatch }

  test('setUser', () => {
    mutations.setUser(state, user)
    expect(state.isAuthenticated).toBeTruthy()
  })

  test('load', async () => {
    jest.spyOn(Auth, 'currentAuthenticatedUser').mockResolvedValue(user)
    await actions.load(context)
    expect(commit).toHaveBeenCalledWith('setUser', user)
  })

  test('register', async () => {
    jest.spyOn(Auth, 'signUp').mockResolvedValue(user)
    await actions.register(context, user)
    expect(commit).toHaveBeenCalledWith('setUser', user)
  })

  test('confirmRegistration', async () => {
    jest.spyOn(Auth, 'confirmSignUp').mockResolvedValue(user)
    await actions.confirmRegistration(context, user)
    expect(commit).toHaveBeenCalledWith('setUser', user)
  })

  test('login', async () => {
    jest.spyOn(Auth, 'signIn').mockResolvedValue(user)
    await actions.login(context, user)
    expect(commit).toHaveBeenCalledWith('setUser', user)
  })

  test('logout', async () => {
    jest.spyOn(Auth, 'signOut').mockImplementation()
    await actions.logout(context)
    expect(commit).toHaveBeenCalledWith('setUser', null)
  })
})
