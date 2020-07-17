import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import register from '@/pages/register'
import { EVENTS_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(Router)

describe('<register />', () => {
  const registerForm = { email: 'user@app.com', password: '123' }
  const confirmForm = { email: 'user@app.com', code: '123' }

  let wrapper, store, mockRoute, spyDispatch, spyRoutePush

  beforeEach(() => {
    mockRoute = new Router({})
    store = new Vuex.Store({
      modules: {
        namespaced: true,
        auth: {
          namespaced: true,
          actions: {
            register: jest.fn(),
            confirmRegistration: jest.fn(),
            login: jest.fn()
          },
          state: {
            isAuthenticated: false
          }
        }
      }
    })
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    spyDispatch = jest.spyOn(store, 'dispatch')
    wrapper = shallowMount(register, {
      localVue,
      store,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: false } },
      data: () => ({ registerForm, confirmForm })
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should redirect to events page if user logged', () => {
    wrapper = shallowMount(register, {
      localVue,
      store,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: true } }
    })
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })

  test('should dispatch an action to register user', () => {
    wrapper.vm.register()
    expect(spyDispatch).toHaveBeenCalledWith('auth/register', registerForm)
  })

  test('should dispatch an action to confirm user', () => {
    wrapper.vm.confirm()
    expect(spyDispatch).toHaveBeenCalledWith(
      'auth/confirmRegistration',
      confirmForm
    )
  })

  test('should dispatch an action to login after confirm user', () => {
    wrapper.vm.confirm()
    expect(spyDispatch).toHaveBeenCalledWith('auth/login', registerForm)
  })

  test('should redirect to events page after confirmation', () => {
    wrapper.vm.confirm()
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })
})
