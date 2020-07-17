import { createLocalVue, shallowMount } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
import Vuex from 'vuex'
import Card from '@/components/Card'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(Vuex)

describe('<Card/>', () => {
  let wrapper, store, spyDispatch
  const event = { id: '1', favorite: false, date: { start: '2020-03-20' } }

  beforeEach(() => {
    store = new Vuex.Store({
      namespaced: true,
      actions: {
        addToFavorites: jest.fn()
      }
    })
    spyDispatch = jest.spyOn(store, 'dispatch')
    wrapper = shallowMount(Card, {
      localVue,
      store,
      propsData: {
        event
      },
      computed: {
        getIcon: () => {
          return 'foo'
        },
        getRedirectIcon: () => {
          return 'bar'
        }
      }
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should get the favorite icon', () => {
    expect(wrapper.vm.getIcon).toBe('foo')
  })

  test('should get the redirect icon', () => {
    expect(wrapper.vm.getRedirectIcon).toBe('bar')
  })

  test('should redirect user to event page', () => {
    window.open = jest.fn()
    wrapper.find('[data-icon-redirect]').trigger('click')
    expect(window.open).toHaveBeenCalled()
  })

  test('should add event to favorites list', () => {
    wrapper.vm.saveFavorite()
    expect(spyDispatch).toHaveBeenCalledWith('addToFavorites', event)
  })

  test('should redirect user to event page', () => {
    window.open = jest.fn()
    wrapper.vm.redirectToEventPage()
    expect(window.open).toHaveBeenCalled()
  })
})
