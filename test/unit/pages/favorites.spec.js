import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import Favorites from '@/pages/favorites'
import { EVENTS_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(Router)

describe('<Favorites/>', () => {
  let wrapper, mockRoute, spyRoutePush

  beforeEach(() => {
    mockRoute = new Router({
      routes: [
        {
          path: EVENTS_ROUTE
        }
      ]
    })
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    wrapper = shallowMount(Favorites, { localVue, router: mockRoute })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should go to events page', () => {
    wrapper.vm.goToEvents()
    expect(spyRoutePush).toHaveBeenCalledWith(EVENTS_ROUTE)
  })
})
