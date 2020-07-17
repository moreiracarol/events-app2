import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import index from '@/pages/index'
import { EVENTS_ROUTE, LOGIN_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(Router)

describe('<index />', () => {
  let wrapper, mockRoute, spyRoutePush

  beforeEach(() => {
    mockRoute = new Router({})
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    wrapper = shallowMount(index, {
      localVue,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: false } }
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should redirect to login page', () => {
    expect(spyRoutePush).toHaveBeenCalledWith(LOGIN_ROUTE)
  })

  test('should redirect to events page if user logged', () => {
    wrapper = shallowMount(index, {
      localVue,
      router: mockRoute,
      mocks: { $auth: { isAuthenticated: true } }
    })
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })
})
