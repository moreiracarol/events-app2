import { createLocalVue, shallowMount } from '@vue/test-utils'
import Router from 'vue-router'
import Events from '@/pages/events'
import { FAVORITES_ROUTE } from '@/utils/constants'

const localVue = createLocalVue()
localVue.use(Router)

describe('<Events />', () => {
  let wrapper, mockRoute, spyRoutePush

  beforeEach(() => {
    mockRoute = new Router({
      routes: [
        {
          path: FAVORITES_ROUTE
        }
      ]
    })
    spyRoutePush = jest.spyOn(mockRoute, 'push')
    wrapper = shallowMount(Events, { localVue, router: mockRoute })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should go to favorites page', () => {
    wrapper.vm.goToFavorites()
    expect(spyRoutePush).toHaveBeenCalledWith(FAVORITES_ROUTE)
  })
})
