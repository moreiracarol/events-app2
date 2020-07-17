import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import Getters from '@/store/getters'
import EventsList from '@/components/EventsList'

const localVue = createLocalVue()
localVue.use(Vuex)

const events = [
  { date: '2020-07-07', title: 'Party' },
  { date: '2020-07-08', title: 'Concert' }
]

describe('<EventsList/>', () => {
  let wrapper, store, spyDispatch

  beforeEach(() => {
    store = new Vuex.Store({
      namespaced: true,
      actions: {
        getEvents: jest.fn(),
        getFavorites: jest.fn()
      },
      state: {
        totalPages: 10,
        events
      },
      getters: Getters
    })
    spyDispatch = jest.spyOn(store, 'dispatch')
    wrapper = shallowMount(EventsList, {
      localVue,
      store,
      propsData: {
        showAllEvents: true
      },
      data: () => {
        return {
          eventsList: events
        }
      }
    })
  })

  test('should render the component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should load events list', () => {
    expect(spyDispatch).toHaveBeenCalledWith('getEvents', {
      page: 0,
      sort: undefined
    })
    expect(wrapper.vm.isEmptyScreen).toBeFalsy()
  })

  test('should load empty list', () => {
    wrapper.setData({ eventsList: [] })
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.vm.isEmptyScreen).toBeTruthy()
  })

  test('should NOT load SortBy components', async () => {
    await wrapper.setProps({ showAllEvents: false })
    expect(wrapper.find('[data-sort-events]').exists()).toBeFalsy()
  })

  test('should load list sorted by name', () => {
    wrapper.vm.loadList('name')
    expect(spyDispatch).toHaveBeenCalledWith('getEvents', {
      page: 0,
      sort: 'name'
    })
  })

  test('should go to page 2', () => {
    wrapper.vm.gotoPage(3)
    expect(spyDispatch).toHaveBeenCalledWith('getEvents', {
      page: 2,
      sort: undefined
    })
  })

  test('should sort events by distance', () => {
    wrapper.vm.loadList('dist')
    expect(spyDispatch).toHaveBeenCalledWith('getEvents', {
      page: 0,
      sort: 'dist'
    })
  })
})
