import { createLocalVue, shallowMount, RouterLinkStub } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import Router from 'vue-router'
import Page from '@/layouts/Page'
import { LOGIN_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)
localVue.use(Router)

describe('<Page />', () => {
  let wrapper, spyDispatch, spyRoutePush, mockRoute, store

  beforeEach(() => {
    mockRoute = new Router({})
    store = new Vuex.Store({
      modules: {
        namespaced: true,
        auth: {
          namespaced: true,
          actions: {
            logout: jest.fn()
          }
        }
      }
    })
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    spyDispatch = jest.spyOn(store, 'dispatch')
    wrapper = shallowMount(Page, {
      localVue,
      store,
      router: mockRoute,
      stubs: {
        NuxtLink: RouterLinkStub
      },
      propsData: {
        pageTitle: 'foo',
        buttonLabel: 'bar'
      }
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('shold emit an event to move to another page', () => {
    wrapper.vm.goToPage()
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  test('should logout user', () => {
    wrapper.vm.logout()
    expect(spyDispatch).toHaveBeenCalledWith('auth/logout')
  })

  test('should redirect user to login page after logout', () => {
    wrapper.vm.logout()
    expect(spyRoutePush).toHaveBeenCalledWith(LOGIN_ROUTE)
  })
})
