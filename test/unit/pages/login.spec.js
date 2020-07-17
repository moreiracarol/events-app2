import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import login from '@/pages/login'
import { EVENTS_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(Router)

describe('<login />', () => {
  const user = { email: 'user@app.com', password: '123' }
  let wrapper, store, mockRoute, spyDispatch, spyRoutePush

  beforeEach(() => {
    mockRoute = new Router({})
    store = new Vuex.Store({
      modules: {
        namespaced: true,
        auth: {
          namespaced: true,
          actions: {
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
    wrapper = shallowMount(login, {
      localVue,
      store,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: false } },
      data: () => ({ email: user.email, password: user.password })
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should redirect to events page if user logged', () => {
    wrapper = shallowMount(login, {
      localVue,
      store,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: true } }
    })
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })

  test('should dispatch an action to login', () => {
    wrapper.vm.login()
    expect(spyDispatch).toHaveBeenCalledWith('auth/login', user)
  })

  test('should redirect to events page after login', () => {
    wrapper.vm.login()
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })
})
