import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import Error from '@/layouts/Error'
import { LOGIN_ROUTE, EVENTS_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(Router)

describe('<Error />', () => {
  let wrapper, mockRoute, spyRoutePush, store

  beforeEach(() => {
    mockRoute = new Router({})
    store = new Vuex.Store({
      modules: {
        namespaced: true,
        auth: {
          namespaced: true,
          state: {
            isAuthenticated: false
          }
        }
      }
    })
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    wrapper = shallowMount(Error, {
      localVue,
      store,
      mocks: { $auth: { isAuthenticated: false } },
      router: mockRoute,
      computed: {
        imageSrc: () => {
          return 'foo'
        }
      }
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should redirect user to login page', () => {
    wrapper.vm.goToHomePage()
    expect(spyRoutePush).toHaveBeenCalledWith(LOGIN_ROUTE)
  })

  test('should redirect user to events page', () => {
    wrapper = shallowMount(Error, {
      localVue,
      store,
      mocks: { $auth: { isAuthenticated: true } },
      router: mockRoute,
      computed: {
        imageSrc: () => {
          return 'foo'
        }
      }
    })
    wrapper.vm.goToHomePage()
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })
})
